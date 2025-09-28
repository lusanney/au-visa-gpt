import DefaultRepo, { ApplicationsRepository } from "./applications.repository";

export class ApplicationsService {
  constructor(private readonly repo: ApplicationsRepository = DefaultRepo) {}

  async listByUser(userId: number, limit = 50) {
    return this.repo.findManyByUserId(userId, limit);
  }

  async getById(id: number) {
    return this.repo.findById(id);
  }

  async create(params: { userId: number; visaCode: string; profile: Record<string, unknown> }) {
    return this.repo.create(params);
  }

  async update(id: number, changes: { visaCode?: string; profile?: Record<string, unknown> }) {
    return this.repo.update(id, changes);
  }
}

const applicationsService = new ApplicationsService();
export default applicationsService;
