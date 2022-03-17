import { LayoutComponent } from './layout/layout.component';
import { PageaccueilComponent } from './pageaccueil/pageaccueil.component';

import { OperationVirementComponent } from './gestion-operation/operation-virement/operation-virement.component';

import { ModifierCompteComponent } from './gestion-compte/modifier-compte/modifier-compte.component';
import { AjouterCompteComponent } from './gestion-compte/ajouter-compte/ajouter-compte.component';
import { TrouverUtilisateurComponent } from './gestion-utilisateur/trouver-utilisateur/trouver-utilisateur.component';
import { SimulateurCreditComponent } from './gestion-credit/simulateur-credit/simulateur-credit.component';
import { GestionCreditComponent } from './gestion-credit/gestion-credit.component';
import { ModifUtilisateurComponent } from './gestion-utilisateur/modif-utilisateur/modif-utilisateur.component';
import { AjoutUtilisateurComponent } from './gestion-utilisateur/ajout-utilisateur/ajout-utilisateur.component';
import { ListOperationComponent } from './gestion-operation/list-operation/list-operation.component';
import { GestionOperationComponent } from './gestion-operation/gestion-operation.component';
import { ListCompteComponent } from './gestion-compte/list-compte/list-compte.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { LisUtilisateurComponent } from './gestion-utilisateur/lis-utilisateur/lis-utilisateur.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { ContentComponent } from './layout/content/content.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeMasterCardComponent } from './gestion-compte/demande-master-card/demande-master-card.component';
import { OperationRetraitComponent } from './gestion-operation/operation-retrait/operation-retrait.component';
import { OperationVersementComponent } from './gestion-operation/operation-versement/operation-versement.component';





const routes: Routes = [
  {
    path: '', component:LayoutComponent, children: [

  {
    path: 'user', component: GestionUtilisateurComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: LisUtilisateurComponent },
      { path: 'add', component: AjoutUtilisateurComponent },

      { path: 'modif/:id', component: ModifUtilisateurComponent },
      { path: 'find', component: TrouverUtilisateurComponent }
    ]

  },
  {
    path: 'compte', component: GestionCompteComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCompteComponent },
      { path: 'add', component: AjouterCompteComponent },
      { path: 'update/:id', component: ModifierCompteComponent }
    ]
  },

  {
    path: 'operation', component: GestionOperationComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListOperationComponent },
      { path: 'retrait', component: OperationRetraitComponent },
      { path: 'versement', component: OperationVersementComponent },
      { path: 'virement', component: OperationVirementComponent }
    ]
  },
  {
    path: 'credit', component: GestionCreditComponent, children: [
      { path: '', redirectTo: 'simulateur', pathMatch: 'full' },

      { path: 'simulateur', component: SimulateurCreditComponent }
    ]
  },
  {
    path: 'mastercard', component: DemandeMasterCardComponent, children: [
      { path: '', redirectTo: 'master', pathMatch: 'full' },
    ]
  }]},



  {
    path: 'acceuil', component:PageaccueilComponent
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
