import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import UsersService from './users.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = {
  storage: diskStorage({
    destination: '../frontend/public/profileImg',
    filename: function (req, file, cb) {
      const name = Date.now() + Math.floor(Math.random() * 100) + '.jpg';

      cb(null, name);
    },
  }),
};

@Controller('users')
export default class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async registerUserFunction(@Body() registerData) {
    return await this.usersService.registerUser(registerData);
  }

  @Post('/login')
  async loginUserFunction(@Body() loginData) {
    return await this.usersService.loginFunction(loginData);
  }

  @Post('/edituser')
  @UseInterceptors(FileInterceptor('img', storage))
  async editUserDataFunction(@UploadedFile() file, @Body() editData) {
    return await this.usersService.editUserData(file, editData);
  }

  @Post('/searchfriend')
  async searchFriendFunction(@Body() searchFriend) {
    return await this.usersService.searchFrined(searchFriend);
  }

  @Get('/getuserfriend/:username')
  async getUserFriendsFunction(@Param('username') username: string) {
    return await this.usersService.getUserFriends(username);
  }

  // ACCEPT INVITE
  @Get('/addfriend/:username/:friendid')
  async addFriendFunction(
    @Param('username') username,
    @Param('friendid') friendid,
  ) {
    return await this.usersService.addFriend(username, friendid);
  }

  // DELETE INVITE
  @Get('/deleteinvite/:username/:friendid')
  async deleteInviteFunction(
    @Param('username') username,
    @Param('friendid') friendid,
  ) {
    return await this.usersService.deleteInvited(username, friendid);
  }

  // DELETE FRIENDS
  @Get('/deletefriend/:username/:friendid')
  async deleteFriendFunction(
    @Param('username') username,
    @Param('friendid') friendid,
  ) {
    return await this.usersService.deleteFriend(username, friendid);
  }

  @Get('/profile/getfriends/:username')
  async getFriendsInProfileFunction(@Param('username') username: string) {
    return await this.usersService.getFriendsInProfile(username);
  }

  // SEND INVITE
  @Get('/sendinvited/:username/:friendsid')
  async sendInvitedFriendsFunction(
    @Param('username') username,
    @Param('friendsid') friendsid,
  ) {
    return await this.usersService.sendInvitedFriends(username, friendsid);
  }

  //  DELETE INVITE
  @Get('/deleteinvitefriend/:username/:friendsid')
  async deleteInvitedFriendsFunction(
    @Param('username') username,
    @Param('friendsid') friendsid,
  ) {
    return await this.usersService.deleteInvitedFriends(username, friendsid);
  }

  // USERS INVITED LIST
  @Get('/usersinvitedlist/:username')
  async userInvitedListFunction(@Param('username') username: string) {
    return await this.usersService.userInvitedList(username);
  }
}
