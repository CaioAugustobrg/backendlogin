import crypto from 'crypto'

export abstract class Entity<T> {
    public id: string
    public createdAt: Date
    public updateAt: Date
    //public props: T

    constructor(id?: string,createdAt?: Date,updateAt?: Date) {
        //this.props = this.props
        this.id = id ?? crypto.randomUUID()
        this.createdAt = createdAt ?? new Date()   
        this.updateAt = updateAt ?? new Date()

    }
}