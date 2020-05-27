export class RiskRegister {

  public id: number;
  public projectId: number;
  public name: string;
  public description: string;
  public risks: object;

  constructor(id?: number, projectId?: number, name?: string, description?: string, risks?: object) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.risks = risks;
  }
}