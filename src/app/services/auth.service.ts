import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  purohitloginurl: any = "https://bookmypurohit.in/api/pandit/login";
  purohitRegisterurl: any = "https://bookmypurohit.in/api/pandit/register";
  yajmanloginurl: any = "https://bookmypurohit.in/api/yajman/login";
  yajmanRegisterurl: any = "https://bookmypurohit.in/api/yajman/register";
  agentloginurl: any = "https://bookmypurohit.in/api/agent/login";
  agentregisterurl: any = "https://bookmypurohit.in/api/agent/register";
  caturl: any = "https://bookmypurohit.in/api/panditServices/getMyServices?pandit_id=";
  updateURL: string = "https://bookmypurohit.in/api/panditServices/updatePanditService";
  panditDetailsURL: string = "https://bookmypurohit.in/api/pandit/getProfileData?pandit_id=";
  panditBookingURL: string = "https://bookmypurohit.in/api/booking/getPanditBookings?pandit_id=";
  categoryURL: string = "https://bookmypurohit.in/api/services/servicesByCat?category_id=";
identity: any;
pandit_id: any
  public isAuthenticate(): boolean {
    const userData1 = sessionStorage.getItem('token');
    const userData2 = sessionStorage.getItem('purohittoken');

    if (userData1 || userData2) {
      return true;
    }
    else {
      return false;
    }
  }
  public getToken() {
    if(this.identity == "purohit"){
      return sessionStorage.getItem('purohittoken');
    }
    if(this.identity == "agent"){
      return sessionStorage.getItem('token');
    }
    if(this.identity == "yajman"){
    return sessionStorage.getItem('yajmantoken');
    }
  }
  public purohitloginAction(postData) {
    this.identity = "purohit";
    var userObj = { mobile: postData.mobile, password: postData.password }
    return this.http.post(this.purohitloginurl, userObj);

  }

  public yajmanloginAction(postData) {
    this.identity = "yajman";
    var userObj = { mobile: postData.mobile, password: postData.password }

    return this.http.post(this.yajmanloginurl, userObj);

  }
  public agentloginActions(postData) {
    this.identity = "agent";
    var userObj = { mobile: postData.mobile, password: postData.password }
    return this.http.post(this.agentloginurl, userObj);
  }

  public async purohitregisterAction(postData) {
    var userRegister = { fname: postData.fname, lname: postData.lname, mobile: postData.mobile, email: postData.email }

    return this.http.post(this.purohitRegisterurl, userRegister);

  }

  public async agentregisterAction(postData) {
    var agentregister = { fname: postData.fname, lname: postData.lname, email: postData.email, mobile: postData.mobile, city: postData.city}
    return this.http.post(this.agentregisterurl, agentregister);

  }


  public yajmanRegisterAction(postData) {
    var userRegister = { fname: postData.fname, lname: postData.lname, mobile: postData.mobile, email: postData.email }
    return this.http.post(this.yajmanRegisterurl, userRegister);
  }
  public async logOutAction() {
    await sessionStorage.removeItem('token');
    await sessionStorage.clear();
    return true;
  }




  getPanditServices(pandit_id){
    this.pandit_id = pandit_id;
  return this.http.get(this.caturl+this.pandit_id);
  }
  act(v) { 
    return this.http.patch(this.updateURL, { "samagri": v.samagri, "cost": v.cost, "duration": v.duration, "pandit_service_id": v.pandit_service_id, "samagri_cost": v.samagri_cost, "noofpandits": v.noofpandits }) 
  }

  getPanditDetails(pandit_id):any {
    this.pandit_id = pandit_id;
    return this.http.get(this.panditDetailsURL + this.pandit_id);
  }

  getPanditBookings(pandit_id){
    this.pandit_id = pandit_id;
    return this.http.get(this.panditBookingURL+this.pandit_id);
  }
getCategories(catID){
    return this.http.get(this.categoryURL + catID);
}
}
// Authorization: `${this.auth.getToken()}`