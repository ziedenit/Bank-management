
<div class="header">
	<div class="container-fluid mb-4">
	<div class="row">
		<div class="col-2">
		 	<div class="header-logo">
			<img src="assets/images/logo-lcl.png" alt="Logo LCL">
		 	</div>
		</div>
	
	  
	
		<div class="col-2">
			<div class="header-title">
			<h1>{{title}}</h1>
			</div>
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
<div class="header">
	<div class="container-fluid mb-4">
	<div class="row">
		<div class="col-2">
		 	<div class="header-logo">
			<img src="assets/images/logo-lcl.png" alt="Logo LCL">
		 	</div>
		</div>
	
	  
	
		<div class="col-2">
			<div class="header-title">
			<h1>{{title}}</h1>
			</div>
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
