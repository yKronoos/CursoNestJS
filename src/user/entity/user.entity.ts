import { Role } from "src/enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column({
        length: 100,
        unique: true
    })
    email: string

    @Column({
        length: 100
    })
    password: string

    @Column({
        type: 'date',
        nullable: true
    })
    birthAt: Date

    @CreateDateColumn()
    createdAt: string

    @CreateDateColumn()
    updatedAt: string

    @Column({
        default: Role.User
    })
    role: number
}