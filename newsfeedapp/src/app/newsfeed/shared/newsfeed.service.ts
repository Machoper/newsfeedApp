import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class NewsfeedService {
  newsfeedList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getNewsfeedList() {
  	this.newsfeedList = this.firebasedb.list('entries');
  	return this.newsfeedList;
  }

  addEntry(title: string, date: string) {
  	this.newsfeedList.push({
  		title: title,
  		date: date
  	});
  }

  removeEntry($key: string) {
  	this.newsfeedList.remove($key);
  }

}
