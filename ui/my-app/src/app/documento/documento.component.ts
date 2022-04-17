import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  constructor(private http:HttpClient) { }

  users:any=[];
  documents:any=[];

  modalTitle ="";
  document_id = 0;
  document_state = "";
  user_name="";
  document_date="";
  document_file="anonymous.png";
  PhotoPath=environment.ARCHIVO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>(environment.API_URL+'document')
    .subscribe(data=>{
      this.documents=data;
    });

    this.http.get<any>(environment.API_URL+'user')
    .subscribe(data=>{
      this.users=data;
    });
  }

  addClick(){
    this.modalTitle="Add Employee";
    this.document_id=0;
    this.document_state="";
    this.user_name="";
    this.document_date="";
    this.document_file="anonymous.png";
  }

  editClick(doc:any){
    this.modalTitle="Edit Employee";
    this.document_id=doc.document_id;
    this.document_state=doc.document_state;
    this.user_name=doc.user_name;
    this.document_date=doc.document_date;
    this.document_file=doc.document_file;
  }

  createClick(){
    var val={
      DocumentState:this.document_state,
      UserName:this.user_name,
      DocumentDate:this.document_date,
      DocumentFile:this.document_file
    };

    this.http.post(environment.API_URL+'document',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  updateClick(){
    var val={
      DocumentId:this.document_id,
      DocumentState:this.document_state,
      UserName:this.user_name,
      DocumentDate:this.document_date,
      DocumentFile:this.document_file
    };

    this.http.put(environment.API_URL+'document',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(environment.API_URL+'document/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }

  imageUpload(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('file',file,file.name);
    
    this.http.post(environment.API_URL+'document/GuardarArchivo',formData)
    .subscribe((data:any)=>{
      this.document_file=data.toString();
    });
  }

}