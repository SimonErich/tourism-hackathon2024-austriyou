import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;
}
