/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from 'type-graphql';

import Project from '../models/Project';
import CreateProjectInput from '../inputs/CreateProjectInput';
import UpdateProjectInput from '../inputs/UpdateProjectInput';

@Resolver()
export default class ProjectResolver {
  @Query(() => [Project])
  projects() {
    return Project.find();
  }

  @Mutation(() => Project)
  async createProject(@Arg('data') data: CreateProjectInput) {
    const project = Project.create(data);
    await project.save();
    return project;
  }

  @Query(() => Project)
  project(@Arg('id') id: string) {
    return Project.findOne({ where: { id } });
  }

  @Mutation(() => Project)
  async updateProject(@Arg('id') id: string, @Arg('data') data: UpdateProjectInput) {
    const project = await Project.findOne({ where: { id } });
    if (!project) throw new Error('Project not found!');
    Object.assign(project, data);
    await project.save();
    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg('id') id: string) {
    const project = await Project.findOne({ where: { id } });
    if (!project) throw new Error('Project not found!');
    await project.remove();
    return true;
  }
}
