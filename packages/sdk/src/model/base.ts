import type { DriverClient, ICreateTableRo, SpaceRole } from '@teable/core';
import type { IGetBaseVo } from '@teable/openapi';
import { knex, type Knex } from 'knex';
import { Table } from './table/table';

export class Base implements IGetBaseVo {
  id: string;
  name: string;
  spaceId: string;
  order: number;
  icon: string | null;
  role: SpaceRole;
  knex: Knex;

  constructor(base: IGetBaseVo, driver: DriverClient) {
    const { id, name, order, spaceId, icon, role } = base;
    this.id = id;
    this.name = name;
    this.spaceId = spaceId;
    this.order = order;
    this.icon = icon;
    this.role = role;
    this.knex = knex({ client: driver });
  }

  async sqlQuery(tableId: string, viewId: string, sql: string) {
    return Table.sqlQuery(this.id, tableId, { viewId, sql });
  }

  async createTable(tableRo?: ICreateTableRo) {
    return Table.createTable(this.id, tableRo);
  }

  async deleteTable(tableId: string) {
    return Table.deleteTable(this.id, tableId);
  }
}
