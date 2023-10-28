import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contacts.model';

@ApiTags('Контакты')
@Controller('contact')
export class ContactsController {
  constructor(private ContactsService: ContactsService) {}

  @ApiOperation({ summary: 'Создать контакт' })
  @ApiResponse({ status: 200, type: Contact })
  @Post('/addContact')
  create(@Body() cardDto: CreateContactDto) {
    return this.ContactsService.createContact(cardDto);
  }

  @ApiOperation({ summary: 'Получить контакт по id' })
  @Get('/:contactId')
  getByValue(@Param('contactId') contactId: number) {
    return this.ContactsService.getContactById(contactId);
  }

  @ApiOperation({ summary: 'Получить контакты пользователя по userId' })
  @Get('/getUserCardList/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.ContactsService.getUserContactList(userId);
  }

  @ApiOperation({ summary: 'Удалить контакт' })
  @Delete('/deleteCard/:contactId')
  remove(@Param('contactId') contactId: number) {
    return this.ContactsService.deleteContact(contactId);
  }
}
