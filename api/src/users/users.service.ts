import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/dtos/users.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async registerUser(registerData) {
    const { login } = registerData.registerData,
      { password } = registerData.registerData,
      { sec_password } = registerData.registerData;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userExist = await this.usersRepository.findBy({
      login: login,
    });

    if (userExist.length > 0) {
      return { error: 'Użytkownik o takim loginie istnieje!' };
    } else {
      if (password === sec_password) {
        if (login.includes('@')) {
          const loginObject = {
            login: login,
            password: hash,
          };
          this.usersRepository.save(loginObject);
          return { success: 'Pomyślnie zarejestrowano' };
        } else {
          return { error: 'Login musi być mailem!' };
        }
      } else {
        return { error: 'Hasła nie są takie same!' };
      }
    }
  }

  async loginFunction(loginData) {
    const { login } = loginData.loginData,
      { password } = loginData.loginData;

    const findUser = await this.usersRepository.findBy({
      login: login,
    });

    if (findUser.length === 0) {
      return { message: 'Błedny login lub hasło' };
    } else {
      const passwordFromDatabase = findUser[0].password;
      const passwordFromDatabaseAfterBcrypt = await bcrypt.compare(
        password,
        passwordFromDatabase,
      );

      if (passwordFromDatabaseAfterBcrypt) {
        return { message: 'Zalogowano', login: login };
      } else {
        return { message: 'Błedny login lub hasło' };
      }
    }
  }

  async editUserData(file, editData) {
    const { login } = editData,
      { password } = editData,
      { sec_password } = editData,
      { default_name } = editData,
      { filename } = file;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userExist = await this.usersRepository.findBy({
      login: login,
    });

    if (userExist[0].profileImg !== 'profile_basic.jpg') {
      fs.unlinkSync(`../frontend/public/profileImg/${userExist[0].profileImg}`);
    }

    if (password === sec_password) {
      if (login.includes('@') && login === default_name) {
        await this.usersRepository.query(
          `UPDATE users SET password='${hash}', profileImg='${filename}' WHERE login='${login}'`,
        );
        return { message: 'Zmieniono hasło' };
      } else if (login.includes('@') && !(userExist.length > 0)) {
        await this.usersRepository.query(
          `UPDATE users SET login='${login}', password='${hash}', profileImg='${filename}' WHERE login='${default_name}'`,
        );
        return { message: 'Zmieniono login oraz hasło' };
      } else {
        return { error: 'Login musi być e-mailem / Zajęty login' };
      }
    } else {
      return { error: 'Hasła nie są takie same' };
    }
  }

  async searchFrined(searchData) {
    const { search } = searchData.searchFriend,
      { loginUser } = searchData.searchFriend;

    const result = await this.usersRepository.query(
      `SELECT * FROM users WHERE login LIKE '%${search}%' AND login != '${loginUser}'`,
    );

    if (result.length > 0) {
      return { findUsers: result };
    } else {
      return { error: 'Nie znaleziono użytkowników' };
    }
  }

  async getUserFriends(username: string) {
    const friendsUser = await this.usersRepository.findBy({
      login: username,
    });

    return { userFriends: friendsUser };
  }

  async addFriend(username: any, friendid: any) {
    // USER WHICH ACCEPT INVITE
    const oldListFriends = await this.usersRepository.findBy({
      login: username,
    });

    const invitedList = oldListFriends[0].invitedFriends.split(' ');

    if (invitedList[0] === '') invitedList.shift();

    const invitedListAfterFilter = invitedList
      .filter((id) => id !== friendid)
      .join(' ');

    const listAfterAddFriend = `${oldListFriends[0].friendsid} ${friendid}`;

    await this.usersRepository.query(
      `UPDATE users SET friendsid='${listAfterAddFriend}' WHERE login='${username}'`,
    );

    await this.usersRepository.query(
      `UPDATE users SET invitedFriends='${invitedListAfterFilter}' WHERE login='${username}'`,
    );
    const friendidData = await this.usersRepository.findBy({
      id: friendid,
    });

    const invitedListFriend = friendidData[0].invitedSended
      .split(' ')
      .filter((id) => +id !== oldListFriends[0].id);

    const friendFriendsList = `${friendidData[0].friendsid} ${oldListFriends[0].id}`;

    await this.usersRepository.query(
      `UPDATE users SET friendsid='${friendFriendsList}' WHERE login='${friendidData[0].login}'`,
    );

    await this.usersRepository.query(
      `UPDATE users SET invitedSended='${invitedListFriend}' WHERE login='${friendidData[0].login}'`,
    );
  }

  async deleteInvited(username, friendid) {
    // USER
    const userData = await this.usersRepository.findBy({
      login: username,
    });

    const oldInvitedList = userData[0].invitedFriends
      .split(' ')
      .filter((id) => +id !== +friendid)
      .join(' ');

    await this.usersRepository.query(
      `UPDATE users SET invitedFriends='${oldInvitedList}' WHERE login='${username}'`,
    );

    // FRIEND
    const friendData = await this.usersRepository.findBy({
      id: friendid,
    });

    const oldFriendSendedList = friendData[0].invitedSended
      .split(' ')
      .filter((id) => +id !== userData[0].id)
      .join(' ');

    await this.usersRepository.query(
      `UPDATE users SET invitedSended='${oldFriendSendedList}' WHERE id='${friendid}'`,
    );
  }

  async deleteFriend(username, friendid) {
    const oldListFriends = await this.usersRepository.findBy({
      login: username,
    });

    const dataFriend = await this.usersRepository.findBy({
      id: friendid,
    });

    // USER
    const oldListSplit = oldListFriends[0].friendsid.split(' ');

    const newListFriends = oldListSplit.filter(
      (friendidfilter) => friendidfilter !== friendid,
    );

    const filteredList = newListFriends.join(' ');

    await this.usersRepository.query(
      `UPDATE users SET friendsid='${filteredList}' WHERE login='${username}'`,
    );

    // FRIEND
    const oldListFriendSplit = dataFriend[0].friendsid.split(' ');

    const newListFriendsFriend = oldListFriendSplit.filter(
      (friendidfilter) => +friendidfilter !== oldListFriends[0].id,
    );

    const filteredListFriend = newListFriendsFriend.join(' ');

    await this.usersRepository.query(
      `UPDATE users SET friendsid='${filteredListFriend}' WHERE login='${dataFriend[0].login}'`,
    );
  }

  async getFriendsInProfile(username: string) {
    const friendsUser = await this.usersRepository.findBy({
      login: username,
    });

    const friendsID = friendsUser[0].friendsid.split(' ');

    // SHIFT usuwa pierwszy element z tablicy
    friendsID.shift();

    const friendsArray = [];

    for (let i = 0; i < friendsID.length; i++) {
      friendsArray.push(
        await this.usersRepository.findBy({
          id: +friendsID[i],
        }),
      );
    }

    return { listFriends: friendsArray };
  }

  async sendInvitedFriends(username, friendid) {
    const usersInvite = await this.usersRepository.findBy({
      login: username,
    });

    const userInvitedList = await this.usersRepository.findBy({
      id: friendid,
    });

    const userUpdatedList = `${usersInvite[0].invitedSended} ${friendid}`;

    const newListInvitedToFriends = `${userInvitedList[0].invitedFriends} ${usersInvite[0].id}`;

    await this.usersRepository.query(
      `UPDATE users SET invitedFriends='${newListInvitedToFriends}' WHERE id='${friendid}'`,
    );

    await this.usersRepository.query(
      `UPDATE users SET invitedSended='${userUpdatedList}' WHERE login='${username}'`,
    );

    return { message: 'Wysłano zaproszenie do znajomych' };
  }

  async deleteInvitedFriends(username, friendid) {
    const invitedList = await this.usersRepository.findBy({
      login: username,
    });
    const friendSended = await this.usersRepository.findBy({
      id: friendid,
    });

    // USER
    const newListInvite = invitedList[0].invitedSended.split(' ');

    const filteredList = newListInvite
      .filter((itemList) => itemList !== friendid)
      .join(' ');

    this.usersRepository.query(
      `UPDATE users SET invitedSended='${filteredList}' WHERE login='${username}'`,
    );

    // FRIEND
    const newFriendList = friendSended[0].invitedFriends.split(' ');
    const filteredFriendList = newFriendList
      .filter((item) => +item !== invitedList[0].id)
      .join(' ');
    this.usersRepository.query(
      `UPDATE users SET invitedFriends='${filteredFriendList}' WHERE login='${friendSended[0].login}'`,
    );

    return { message: 'Usunięto zaproszenie' };
  }

  async userInvitedList(username: string) {
    const friendsUser = await this.usersRepository.findBy({
      login: username,
    });

    const friendsID = friendsUser[0].invitedFriends.split(' ');

    // SHIFT usuwa pierwszy element z tablicy
    if (friendsID[0] == '') friendsID.shift();

    const friendsArray = [];

    for (let i = 0; i < friendsID.length; i++) {
      const helper = await this.usersRepository.findBy({
        id: +friendsID[i],
      });
      friendsArray.push(helper[0]);
    }

    if (friendsArray.length > 0) {
      return { invitedFriends: friendsArray };
    } else {
      return { invitedFriends: friendsArray };
    }
  }
}
