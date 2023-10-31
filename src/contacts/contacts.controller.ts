import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contacts.model';

@ApiTags('Контакты')
@Controller('contacts')
export class ContactsController {
  constructor(private ContactsService: ContactsService) {}

  @ApiOperation({ summary: 'Создать контакт' })
  @ApiResponse({ status: 200, type: Contact })
  @Post('/addContact')
  create(@Body() contactDto: CreateContactDto) {
    return this.ContactsService.createContact(contactDto);
  }

  @ApiOperation({ summary: 'Получить контакт по id' })
  @Get('/getContact/:contactId')
  getByValue(@Param('contactId') contactId: number) {
    return this.ContactsService.getContactById(contactId);
  }

  @ApiOperation({ summary: 'Получить контакты пользователя по userId' })
  @Get('/getUserContactsList/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.ContactsService.getUserContactList(userId);
  }

  @ApiOperation({ summary: 'Удалить контакт' })
  @Delete('/deleteContact/:contactId')
  remove(@Param('contactId') contactId: number) {
    return this.ContactsService.deleteContact(contactId);
  }
}
