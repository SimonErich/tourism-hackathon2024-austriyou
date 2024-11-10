import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonaEntity } from './Persona.entity';

@Entity('activties')
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'longtext' })
  description: string;

  @ManyToMany(() => PersonaEntity, (persona) => persona.activities)
  @JoinTable()
  personas: PersonaEntity[];
}
