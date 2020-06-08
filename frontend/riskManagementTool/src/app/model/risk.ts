export class Risk {
    public id: number;
    public registerId: number;
    public dateRaised: Date;
    public name: string;
    public description: string;
    public status: string;
    public impactId: number;
    public probabilityId: number;
    public severityId: number;

    constructor(id?: number, registerId?: number, dateRaised?: Date, name?: string, description?: string, status?: string, impactId?: number, probabilityId?: number, severityId?: number) {
        this.id = id;
        this.registerId = registerId;
        this.dateRaised = dateRaised;
        this.name = name;
        this.description = description;
        this.status = status;
        this.impactId = impactId;
        this.probabilityId = probabilityId;
        this.severityId = severityId;
      }
}