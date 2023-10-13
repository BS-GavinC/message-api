import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService {

    private pool: sql.ConnectionPool;
    /**
     *
     */
    constructor() {
       
        this.pool = new sql.ConnectionPool({
            user: 'sa',
            password: 'Test123=',
            server: 'localhost',
            database: 'message-db',
            options: {"trustServerCertificate": true}
        })
        
    }

    async connect() {
        try {
          await this.pool.connect();
          console.log('Connexion à la base de données SQL Server réussie.');
        } catch (error) {
          console.error('Erreur de connexion à la base de données:', error);
          throw error;
        }
      }

      async executeQuery(query: string, params? : any) {
        try {
          const request = this.pool.request();
          if (params) {
            for (const key in params) {
              request.input(key, params[key]);
            }
          }
          const result = await request.query(query);
          return result.recordset;
        } catch (error) {
          console.error('Erreur lors de l\'exécution de la requête SQL:', error);
          throw error;
        }
      }
}
