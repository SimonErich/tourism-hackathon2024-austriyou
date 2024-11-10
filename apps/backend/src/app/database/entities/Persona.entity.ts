import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityEntity } from './Activity.entity';

@Entity('personas')
export class PersonaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @OneToMany(() => ActivityEntity, (activity) => activity.personas)
  activities: ActivityEntity[];
}
