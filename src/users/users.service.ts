import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {

    private async getUser(token: string, uid: string) {
        const verifyId = await this.verifyToken(token);
        if (!verifyId) {
            console.log("Access Denied!")
            throw new HttpException('Access Denied!', HttpStatus.UNAUTHORIZED);
        }
        if(!uid) throw new HttpException('Page Not Found!', HttpStatus.NOT_FOUND);
        let auth = admin.auth()
        return auth
            .getUser(uid)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                //console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                return Promise.resolve(userRecord.toJSON())
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
                throw new HttpException('Page Not Found!', HttpStatus.NOT_FOUND);
            });
    }
    async getDataUser(token: string, uid: string): Promise<any> {
        const verifyId = await this.verifyToken(token);
        if (!verifyId) {
            console.log("Access Denied!")
            throw new HttpException('Access Denied!', HttpStatus.UNAUTHORIZED);
        }
        if(!uid) throw new HttpException('Page Not Found!', HttpStatus.NOT_FOUND);
        const user = await this.getUser(token, uid)
        var db = admin.database();
        var ref = db.ref(`users/${uid}`);
        let data = {db: {}, fb: {}}
        await ref.once("value", async function (snapshot) {
            if (snapshot.exists()) {
                let dataDb = snapshot.toJSON()
                data = { db: dataDb, fb: user }
                console.log(data)
            }
            else {
                data = {db: {bio: "Minha Bio", university: "Minha universidade"}, fb: user}
                console.log(data)
            }
        })
        return Promise.resolve(data)
    }
    private async verifyToken(tokenId: string) {
        if (!tokenId) {
            console.log(tokenId)
            return false;
        }
        var auth = admin.auth();
        return auth.verifyIdToken(tokenId)
            .then((decodedToken) => {
                const uid = decodedToken.uid
                return uid
            })
            .catch(() => { return false })
    }
}
