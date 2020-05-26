export class Project {

  constructor(id: number, name: string, description: string, riskRegisters: object) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.riskRegisters = riskRegisters;
  }

  public id: number;
  public name: string;
  public description: string;
  public riskRegisters: object;
}