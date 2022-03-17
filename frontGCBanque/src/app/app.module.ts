import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { LisUtilisateurComponent } from './gestion-utilisateur/lis-utilisateur/lis-utilisateur.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { ListCompteComponent } from './gestion-compte/list-compte/list-compte.component';
import { GestionOperationComponent } from './gestion-operation/gestion-operation.component';
import { ListOperationComponent } from './gestion-operation/list-operation/list-operation.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { AjoutUtilisateurComponent } from './gestion-utilisateur/ajout-utilisateur/ajout-utilisateur.component';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ModifUtilisateurComponent } from './gestion-utilisateur/modif-utilisateur/modif-utilisateur.component';
import{ReactiveFormsModule} from '@angular/forms';
import { GestionCreditComponent } from './gestion-credit/gestion-credit.component';
import { SimulateurCreditComponent } from './gestion-credit/simulateur-credit/simulateur-credit.component';
import { TrouverUtilisateurComponent } from './gestion-utilisateur/trouver-utilisateur/trouver-utilisateur.component';
import { AjouterCompteComponent } from './gestion-compte/ajouter-compte/ajouter-compte.component';
import {DropdownModule} from 'primeng/dropdown';
import { DemandeMasterCardComponent } from './gestion-compte/demande-master-card/demande-master-card.component';
import { ModifierCompteComponent } from './gestion-compte/modifier-compte/modifier-compte.component';

import { OperationRetraitComponent } from './gestion-operation/operation-retrait/operation-retrait.component';
import { OperationVersementComponent } from './gestion-operation/operation-versement/operation-versement.component';
import { OperationVirementComponent } from './gestion-operation/operation-virement/operation-virement.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {GalleriaModule} from 'primeng/galleria';
import { PageaccueilComponent } from './pageaccueil/pageaccueil.component';

import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    GestionUtilisateurComponent,
    LisUtilisateurComponent,
    GestionCompteComponent,
    ListCompteComponent,
    GestionOperationComponent,
    ListOperationComponent,
    AjoutUtilisateurComponent,
    ModifUtilisateurComponent,
    GestionCreditComponent,
    SimulateurCreditComponent,
    TrouverUtilisateurComponent,
    AjouterCompteComponent,
  DemandeMasterCardComponent,
  ModifierCompteComponent,

  OperationRetraitComponent,

  OperationVersementComponent,

  OperationVirementComponent,

  PageaccueilComponent,
  LayoutComponent






  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
    FormsModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    GalleriaModule

  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
