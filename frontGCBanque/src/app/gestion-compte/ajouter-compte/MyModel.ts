.container-starter {
  margin-left: 50px;
  margin-top: 50px;
}

h2, h3{

  text-align: left;
}

h1{

  display: inline-block;
  
}

.check{
 height: 30px;
}

//

<div class="header">
	<div class="row main">
		<div class="col-2">
			<div class="header-logo">
				<img src="assets/images/logo-lcl.png" alt="Logo LCL">
			</div>
		</div>
		<div class="col-8">
			<div class="header-title">
				<h1>{{title}}</h1>
			</div>
		</div>
	
	</div>
</div>

<app-oidc (userInfoEmitter)="connectedHandler($event)"></app-oidc>

<div class="container-starter" *ngIf="connected && !errorOIDC">

	</div>

<div *ngIf="connected && !errorOIDC">
	<router-outlet></router-outlet>
</div>

j'ai un probleme avec le {{title}} qui deborde si je reduit l'ecran au min qui n'est pas responsive comme je le rends responsive 
