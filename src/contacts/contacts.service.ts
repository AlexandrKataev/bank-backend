import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './contacts.model';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact) private contactsRepository: typeof Contact) {}

  async getContactById(contactId: number) {
    const contact = await this.contactsRepository.findByPk(contactId);
    return contact;
  }

  async getUserContactList(userId: number) {
    const contacts = await this.contactsRepository.findAll({ where: { userId } });
    return contacts;
  }

  async createContact(contactDto: CreateContactDto) {
    const contact = await this.contactsRepository.create(contactDto);
    return contact;
  }

  async deleteContact(contactId: number) {
    try {
      await this.contactsRepository.destroy({ where: { id: contactId } });
      return `Контакт ${contactId} удалён`;
    } catch (e) {
      console.log(e);
      return 'Не удалось удалить контакт';
    }
  }
}
