import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private http:HttpClient) { }

  users:any=[];

  modalTitle ="";
  user_id = 0;
  user_name = "";

  UserIdFilter="";
  UserNameFilter="";
  usuariosWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'user')
    .subscribe(data=>{
      this.users=data;
      this.usuariosWithoutFilter=data;
    });
  }

  addClick(){
    this.modalTitle="Adicionar usuario";
    this.user_id=0;
    this.user_name="";
  }

  editClick(usr:any){
    this.modalTitle="Editar usuario";
    this.user_id=usr.user_id;
    this.user_name=usr.user_name;
  }

  createClick(){
    var val={
      UserName:this.user_name
    };

    this.http.post(environment.API_URL+'user',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      UserId:this.user_id,
      UserName:this.user_name
    };

    this.http.put(environment.API_URL+'user',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Esta seguro?')){
    this.http.delete(environment.API_URL+'user/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }

  FilterFn(){
    var UserIdFilter=this.UserIdFilter;
    var UserNameFilter=this.UserNameFilter;

    this.users=this.usuariosWithoutFilter.filter(
      function(us:any){
        return us.user_id.toString().toLowerCase().includes(
          UserIdFilter.toString().trim().toLowerCase()
        )&& 
          us.user_name.toString().toLowerCase().includes(
            UserNameFilter.toString().trim().toLowerCase())
      }
    );
  }

  sortResult(prop:any,asc:any){
    this.users=this.usuariosWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
      }
      else{
        return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
      }
    });
  }

}
