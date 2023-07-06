import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const API_URL = 'http://localhost:8084/user/service/';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
class UserService {
  get currentUserValue(){
    return currentUserSubject.value;
  }

  get currentUser(){
    return currentUserSubject.asObservable();
  }

  login(user){
    const headers = {
      username:user.username,
      password:user.passwords
    };

    return axios.get(API_URL + 'login', {headers: headers}).then(response => {
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      currentUserSubject.next(response.data);
    });
  }

  logOut(){
   
      localStorage.removeItem('currentUser');
      currentUserSubject.next(null);
      return
    }
  

  register(user){
    console.log("called")
    return axios.post(API_URL + 'registration', JSON.stringify(user),
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

}

export default new UserService();
