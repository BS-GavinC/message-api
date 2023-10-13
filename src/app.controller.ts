import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database/database.service';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private db : DatabaseService) {}

  @Get("/:message")
  async getHello(@Param('message') message : string) {

    await this.db.connect();



    let result = await this.db.executeQuery("INSERT INTO message(message, add_date) OUTPUT inserted.id VALUES(@mess, GETDATE())", {mess : message})

    console.log(result[0].id);

    let returnResult = await this.db.executeQuery("SELECT * FROM message WHERE id = @id", {id : result[0].id - 1})
    
    console.log(returnResult);
    

    return returnResult[0];
  }
}
