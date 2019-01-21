var profil = {err_cand:0, err_chiffr:0, bon_cand:0, bon_rep:0};
var corr_can_array= new Array();
function cons_correct_can(){
/////////Construire l'array de candidats///////////////////	
			
			//var intermid_arr= new Array();
			var k=0;
			var ex_can_array0 = new Array();
				for (id=0;id<=80;id++){
				ex_can_array0[id]=document.getElementById("exsist_can"+id+"").value; 
					k=0;var intermid_arr= new Array();
					for (i=0;i<ex_can_array0[id].length;i++){
						if (ex_can_array0[id][i]!=","){
						intermid_arr[k]=ex_can_array0[id][i];
						k++;
						}
					corr_can_array[id]=intermid_arr;
					
					}
				}console.log("inter",corr_can_array[2]);
			
}
function elimine_corr_can(in_value,id){
var i0= id-(id%9);
var i1=i0+9;
var j0= id%9;	
for(i=i0;i<i1;i++){//console.log("ligne0"+corr_can_array[i]);
	for(j=0;j<corr_can_array[i].length;j++){
		if (corr_can_array[i][j]==in_value)corr_can_array[i].splice(j, 1);
	}//console.log("ligne1"+corr_can_array[i]);
}
for(i=j0;i<=80;i=i+9){//colonne
	for(j=0;j<corr_can_array[i].length;j++){
		if (corr_can_array[i][j]==in_value)corr_can_array[i].splice(j, 1);
	}
}
if (id%9<3){
	if(id<=26){
		elimin_petit_care(0,id);
	}
	if(id>=27&&id<=53){
		elimin_petit_care(27,id);
	}
	if(id>53){
		elimin_petit_care(54,id);
	}
}
if (id%9>=3&&id%9<6){
	if(id<27){
	 elimin_petit_care(3,id);
	}
	if(id>26&&id<54){
		elimin_petit_care(30,id);
	}
	if(id>53){
	 elimin_petit_care(57,id);
	}
}
if (id%9>=6){
	if(id<27){
		elimin_petit_care(6,id);
	}
	if(id>26&&id<54){
	 elimin_petit_care(33,id);
	}
	if(id>53){
	elimin_petit_care(60,id);
	}
}
}
function elimin_petit_care(first_id,input_id){
	var in_value=document.getElementById("input-"+input_id+"").value;
for(j=first_id;j<=(first_id+20);j+=9){
	for(i = j; i<j+3;i++){console.log("care0"+corr_can_array[i]);
		for(k=0;k<corr_can_array[i].length;k++){
		if (corr_can_array[i][k]==in_value)corr_can_array[i].splice(k, 1);
	}console.log("care1"+corr_can_array[i]);
	}
}
}
function petit_care(first_id,input_id){
	var in_value=document.getElementById("input-"+input_id+"").value;
	var r="";
	var j=parseInt(first_id);
	var bin_var=true;
	while (j<=first_id+20){
	//for(j=first_id;j<=(first_id+20);j+=9){
		
		for(i = j; i<j+3;i++){
			if(in_value==document.getElementById("input-"+i+"").value && i!=input_id &&in_value!=""){
			r+= ("<p>Fait attention! Le chiffre " +in_value+ " existe déjà dans <b> le même petit caré, </b> voir la case "+ Trans_num(i)+".</p>");
			bin_var=false;
			// Colorier le carée
			for(K=first_id;K<=(first_id+20);K+=9){
				for(l = K; l<K+3;l++){
					document.getElementById("input-"+l+"").style.backgroundColor = "#d279a6";
				}
			}
			document.getElementById("input-"+i+"").style.backgroundColor = "red";
			document.getElementById("input-"+input_id+"").style.backgroundColor = " #ffcc66";
			}
			
			else r+="";
			if(bin_var){ 
				
				for(K=first_id;K<=(first_id+20);K+=9){
				for(l = K; l<K+3;l++){
					document.getElementById("input-"+l+"").style.backgroundColor = "white";
				}
			}
			document.getElementById("input-"+i+"").style.backgroundColor = "white";
			}
		}
		j +=9;
	}//alert(bin_var);
if(!bin_var) {document.getElementById("input-"+input_id+"").style.backgroundColor = " #ffcc66";//jaune
	$('#espace_tuteur_3').html(" <br>Je vous suggère de remplir les cases avec les différents candidats en premier. (Voir la première étape de la stratégie 2)");
	$('#espace_strategie_1').html("Recommandation : Place tous les candidats possibles dans toutes les cases de la grille du Sudoku.");			
}
return r;
}
function Grand_chiffre(id){
	//if(document.getElementById("input-"+id+"").value=="")document.getElementById("input-"+id+"").style.backgroundColor = "white";
	var str="<b>Case  "+ Trans_num(id)+"</b><br>";
	var in_can_str=document.getElementById("input_can"+id+"").value; 
	var can_array = in_can_str.split('');
	var can_taille=can_array.length;
	var in_value=document.getElementById("input-"+id+"").value;
	//il entre un Grand Chiffre qui exsiste parmis les candidats
	if(corr_can_array[id].length>1) {//document.getElementById("input-"+id+"").style.backgroundColor = "#ffcc66";//#ffcc66
		for (i=0;i<corr_can_array[id].length;i++){
			if (in_value==corr_can_array[id][i]){
				document.getElementById("input-"+id+"").style.backgroundColor = "#ffcc66";
				str+="Vous avez "+corr_can_array[id].length+" possibilité(s) pour cette case. Ceci n’est donc pas une réponse certaine.<br>";
				if (can_array.length==0) {str+=" <br>Je vous suggère de remplir les cases avec les différents candidats en premier. (Voir la première étape de la stratégie 2).";
				$('#espace_strategie_1').html("Recommandation : Place tous les candidats possibles dans toutes les cases de la grille du Sudoku.");
				}
				else{str+="<br>Je vous suggère de vérifier les candidats pour cette case et de chercher la case où un seul candidat est inscrit.";
					$('#espace_strategie_1').html("Recommandation : Place tous les candidats possibles dans toutes les cases de la grille du Sudoku.");
					$('#espace_strategie_2').html("");
				
				}
				
			}
		}
	}//var profil = {err_cand:0, err_chiffr:0, bon_rep:0};
	//il y a 1 cand correct mais il a mis un G chiffre n'est pas correct
	if(corr_can_array[id].length==1 && in_value!=corr_can_array[id][0]&&can_taille==1&&can_array[0]==corr_can_array[id][0]){
		str+="Vous devriez mettre le seul candidat qui reste. (Voir la 3ième étape de la Stratégie 1)";
		$('#espace_strategie_1').html("Bravo! Transforme la possibilité en certitude : place le chiffre certain.");
		profil["err_chiffr"]++;
		}
	if(corr_can_array[id].length==1 && in_value==corr_can_array[id][0]){//G chiffre bon
		if(can_taille==0) {
			str+="Ce chiffre est bon, mais vous devriez remplir les candidats selon notre stratégie.<br>";
			profil["bon_rep"]++;
		}
		if(can_taille==1){
			if(can_array[0]==corr_can_array[id][0]){
				profil["bon_rep"]++;
				str+="<p style='color:green'>Bravo!! Ceci est fort probablement la bonne réponse! Vous avez bien compris la stratégie. Continuez sur cette voie!</p>";
				$('#espace_strategie_1').html("Maintenant, élimine tous les candidats qui ne sont plus possibles d’après le chiffre placé avec certitude.");
			//ici eliminer les candidats lien/colone/care
			elimine_corr_can(in_value,id);
			}
		}
		if(can_taille>1){
			profil["bon_rep"]++;
			str+="Cette réponse est bonne, mais vous avez plusieurs chiffres restant dans la liste de candidats, (Voir la deuxième étape de la Stratégie 1)";
			$('#espace_strategie_1').html("Cherche la cellule où un seul candidat est inscrit.");
		}
		
	}
	
	$('#espace_tuteur_1').html(str);
	$('#espace_tuteur_3').html("");
}
function verify_candidates(id){
	all_white();
$('#espace_tuteur_1').html("");
$('#espace_tuteur_2').html("");
var str="";
	var in_can_str=document.getElementById("input_can"+id+"").value; 
	//var ex_can_array=document.getElementById("exsist_can"+id+"").value; 
	var can_array = in_can_str.split('');
	var can_taille=can_array.length;
	
		if(can_taille==0) {str+="<b>La liste de candidats de la case  </b>"+Trans_num(id)+" est vide <br>";
		$('#espace_strategie_1').html(" Essayez d'écrire tous les candidats possibles dans cette case.");}
		else{
	str+="<b>Les candidats de la case </b>"+Trans_num(id)+"<br>";
	//Pour vérifier si il y a des candidats dupliqué
	for(i=0;i<can_taille;i++){
		for(j=i+1;j<can_taille;j++){
		if(can_array[i]==can_array[j]){str+="Le candidat "+can_array[i] + " est dupliqué, Le même candidat ne peut être répété.<br><br>";
		can_array.splice(i, 1);
		//$('#espace_strategie_2').html("Le même candidat ne peut être répété.");
		}
	}
	}
	var s="";
	//str+= corr_can_array[id]+" new : "+can_array+"<br>";
	var indic;
	for (i=0;i<can_taille;i++){//can_array
		indic=false;
		for (j=0;j<corr_can_array[id].length;j++){//ex_array
			if(can_array[i]==corr_can_array[id][j]) indic=true;//candidat i correct
		}
		if (indic) {
			profil["bon_cand"]++;//alert(profil["bon_cand"]);
			str+= "<span style= color:green;'><b>"+can_array[i] + " est un bon candidat, Bravo!</b></span><br>";
			$('#espace_strategie_2').html("");
			}
		else {
			profil["err_cand"]++;//alert(profil["err_cand"]);
			str+= can_array[i] + " n'est pas un candidat pour cette case :(  <br> " ;
			str+= verifier_mauv_can(can_array[i],id);
			//str+= S1;
			}///////////////////////////il doit dire pourquoi 
				
	}
	var k=0;////////////Pour autres possibilités
	for (i=0;i<corr_can_array[id].length;i++){//ex_array
		indic=false;
		for (j=0;j<can_taille;j++){//can_array
			if(corr_can_array[id][i]===can_array[j] || corr_can_array[id][i]==",") {indic=true;}
			
		}s+="<br>";
		if (!indic){k++;s+="i="+corr_can_array[id][i]; }//les bonnes possibilités qui reste
	}
	if (k>0) {str+= " <br>Vérifiez tous vos candidats pour cette case! Il y a encore " +k+ " candidat(s) à trouver.<br>";
	$('#espace_strategie_1').html(" Essayez d'écrire tous les candidats possibles dans cette case.");}
	else { str+= " Bravo! Vous avez inscrit  tous les bons candidats pour la case "+Trans_num(id)+", vous avez bien compris la stratégie. Continuez dans cette voie!.<br>";
		$('#espace_strategie_2').html("Continuez jusqu'à vous trouviez la/les case(s) avec un seul candidat.");
		
	}
}
	$('#espace_tuteur_3').html(str);
	}
function all_white(){
	for(i=0;i<81;i++){
	document.getElementById("input-"+i+"").style.backgroundColor = "white";	
		
}}
function verifier_mauv_can(candidate,id){
	var i0= id-(id%9);
	var i1=i0+9;
	var j0= id%9;
	var tutor_message="";
	var bin_var2=false;
	for(i=i0;i<i1;i++){
		if(candidate==document.getElementById("input-"+i+"").value&& i!=id&&candidate!=""){
			tutor_message +=" Le chiffre " +candidate+ " existe déjà dans la même <b> ligne </b>dans la case "+ Trans_num(i)+".</p><br>";
			document.getElementById("input-"+i+"").style.backgroundColor = "red";
			bin_var2=true;
			
		}
		//else document.getElementById("input-"+i+"").style.backgroundColor  = "white";
		}
	for(i=j0;i<=80;i=i+9){
		if(candidate==document.getElementById("input-"+i+"").value&& i!=id&&candidate!=""){
			tutor_message +=" Le chiffre " +candidate+ " existe déjà dans le même <b> colonne </b> dans la case "+ Trans_num(i)+".</p><br>";
			document.getElementById("input-"+i+"").style.backgroundColor  = "red";
			bin_var2=true;
			
		}
		//else document.getElementById("input-"+i+"").style.backgroundColor  = "white";
		}
	if(bin_var2)$('#espace_strategie_2').html("<br>Les candidats d’une case ne peuvent être déjà dans la grille comme étant des chiffres certains de la grille.");
	else {tutor_message +=" Le chiffre " +candidate+ " existe déjà dans la même <b> petit case.</b>";
		$('#espace_strategie_2').html("<br>Les candidats d’une case ne peuvent être déjà dans la grille comme étant des chiffres certains de la grille.");}

	return tutor_message;
	
}
function  verify_row_column(input_id){
all_white();	
var in_value=document.getElementById("input-"+input_id+"").value;
if(in_value=="")document.getElementById("input-"+input_id+"").style.backgroundColor = "white";
var i0= input_id-(input_id%9);
var i1=i0+9;
var j0= input_id%9;
var tutor_message="";
var bin_var2=false;
for(i=i0;i<i1;i++){//ligne
	if(in_value==document.getElementById("input-"+i+"").value&& i!=input_id&&in_value!=""){
		tutor_message +="<p>Fait attention! Le chiffre " +in_value+ " existe déjà dans la même <b> ligne, </b>voir la case "+ Trans_num(i)+".</p><br>";
		document.getElementById("input-"+i+"").style.backgroundColor = "red";
		bin_var2=true;
		
	}
	//else document.getElementById("input-"+i+"").style.backgroundColor  = "white";
	}
for(i=j0;i<=80;i=i+9){//colonne
	if(in_value==document.getElementById("input-"+i+"").value&& i!=input_id&&in_value!=""){
		tutor_message +="<p>Fait attention! Le chiffre " +in_value+ " existe déjà dans le même <b> colonne, </b> voir la case "+ Trans_num(i)+".</p><br>";
		document.getElementById("input-"+i+"").style.backgroundColor  = "red";
		bin_var2=true;
		
	}
	//else document.getElementById("input-"+i+"").style.backgroundColor  = "white";
	}	
var petit_care_message="";
	if (input_id%9<3){
	if(input_id<=26){
		petit_care_message += petit_care(0,input_id);
	}
	if(input_id>=27&&input_id<=53){
		petit_care_message += petit_care(27,input_id);
	}
	if(input_id>53){
		petit_care_message += petit_care(54,input_id);
	}
}
if (input_id%9>=3&&input_id%9<6){
	if(input_id<27){
		petit_care_message += petit_care(3,input_id);
	}
	if(input_id>26&&input_id<54){
		petit_care_message += petit_care(30,input_id);
	}
	if(input_id>53){
		petit_care_message += petit_care(57,input_id);
	}
}
if (input_id%9>=6){
	if(input_id<27){
		petit_care_message += petit_care(6,input_id);
	}
	if(input_id>26&&input_id<54){
		petit_care_message += petit_care(33,input_id);
	}
	if(input_id>53){
		petit_care_message += petit_care(60,input_id);
	}
}
tutor_message +=petit_care_message;

if(bin_var2||petit_care_message!=""){profil["err_chiffr"]++;}
if(bin_var2) {
	document.getElementById("input-"+input_id+"").style.backgroundColor = " #ffcc66";//jaune
	$('#espace_tuteur_3').html(" <br>Je vous suggère de remplir les cases de candidats en première, voir stratègie_2 1er étape");
	$('#espace_strategie_1').html("Place tous les candidats possible dans toutes les cases de la grille de Sudoku.");			
}
$('#espace_tuteur_2').html(tutor_message);
Grand_chiffre(input_id);
}
function petit_care(first_id,input_id){
	var in_value=document.getElementById("input-"+input_id+"").value;
	var r="";//first_id+""+input_id
	var j=parseInt(first_id);
	var bin_var=true;
	while (j<=first_id+20){
	//for(j=first_id;j<=(first_id+20);j+=9){
		
		for(i = j; i<j+3;i++){
			if(in_value==document.getElementById("input-"+i+"").value && i!=input_id &&in_value!=""){
			r+= ("<p>Fait attention! Le chiffre " +in_value+ " existe déjà dans <b> le petit caré, </b> voir la case "+ Trans_num(i)+".</p>");
			bin_var=false;
			// Colorier le carée
			for(K=first_id;K<=(first_id+20);K+=9){
				for(l = K; l<K+3;l++){
					document.getElementById("input-"+l+"").style.backgroundColor = "#d279a6";
				}
			}
			document.getElementById("input-"+i+"").style.backgroundColor = "red";
			document.getElementById("input-"+input_id+"").style.backgroundColor = " #ffcc66";
			}
			
			else r+="";
			if(bin_var){ 
				
				for(K=first_id;K<=(first_id+20);K+=9){
				for(l = K; l<K+3;l++){
					document.getElementById("input-"+l+"").style.backgroundColor = "white";
				}
			}
			//document.getElementById("input-"+i+"").style.backgroundColor = "white";
			}
		}
		j +=9;
	}//alert(bin_var);
if(!bin_var) {document.getElementById("input-"+input_id+"").style.backgroundColor = " #ffcc66";//jaune
	$('#espace_tuteur_3').html(" <br>Je vous suggère de remplir les cases avec les différents candidats en premier. (Voir la première étape de la stratégie 2)");
	$('#espace_strategie_1').html("Place tous les candidats possibles dans toutes les cases de la grille de Sudoku.");			
}
return r;
}
function Trans_num(input_id){
	var str="";
	
	switch(input_id%9) {
		case 0: str+="A";
		break;
		case 1: str+="B";
		break;
		case 2: str+="C";
		break;
		case 3: str+="D";
		break;
		case 4: str+="E";
		break;
		case 5: str+="F";
		break;
		case 6: str+="G";
		break;
		case 7: str+="H";
		break;
		case 8: str+="I";
		break;
}
if (input_id<=8)str+="1";
if (input_id>=9&&input_id<=17)str+="2";
if (input_id>=18&&input_id<=26)str+="3";
if (input_id>=27&&input_id<=35)str+="4";
if (input_id>=36&&input_id<=44)str+="5";
if (input_id>=45&&input_id<=53)str+="6";
if (input_id>=54&&input_id<=62)str+="7";
if (input_id>=63&&input_id<=71)str+="8";
if (input_id>=72&&input_id<=80)str+="9";
return str;
}
function regle_page_1(){
	openCity(event,'regles')

str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2>Définition de la table de jeu:  </h2>\n' ;
str+= '		<p><img src=\"lib/images/2_LeJeu.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		Au total, la grille contient 81 espaces. <br> Les différents escapes sont nommés par une lettre et un chiffre (cellule H4). \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
//str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"openCity(event,"regles")\">Précédent</button>\n' ;
str+= '		<button class=\" w3-button w3-teal w3-right\" style=\" margin-bottom:0; position: relative;\" onclick=\"regle_page_2()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	

	
}
function regle_page_2(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2>LA règle d’or du Sudoku :  </h2>\n' ;
//str+= '		<img src=\"lib/images/2_LeJeu.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		<p>il faut placer 9 fois les chiffres de 1 à 9, sans qu’il y ait deux chiffres identiques dans une ligne, une colonne et une case.  \n' ;
str+='		</p><br><br></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_1()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_3()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}
function regle_page_3(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2>Début du jeu :   </h2>\n' ;
str+= '	<p>	<img src=\"lib/images/4_LeDebut.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		Le jeu contient toujours un certain nombre de chiffres pré-placés. La quantité et la disposition des chiffres dans la grille dépend du niveau de difficulté du jeu de Sudoku. Tous les jeux de Sudoku peuvent être résolus en utilisant la logique et possède une solution unique. Aucun chiffre ne devrait être placé au hasard. <br> Voici un exemple de grille Sudoku d’un niveau de difficulté bas.  \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_2()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_4()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}
function regle_page_4(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2> Il faut débuter :   </h2>\n' ;
str+= '	<p>	<img src=\"lib/images/5_Commencer.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		il faut trouver un espace où un seul chiffre est possible. Souvent ceci correspond au chiffre se répétant le plus grand nombre de fois dans la grille. Dans le présent cas, les ‘8’ des  colonnes A et C permettent de placer le ‘8’ dans la colonne B.  Il est aussi possible que le premier chiffre placé vienne d’une suite.<br>Cette stratégie peut être utilisée autant de fois que nécessaire afin de placer un maximum de nouveau chiffre dans la grille.   \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_3()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_5()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}
function regle_page_5(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2> Un chiffre par ligne   </h2>\n' ;
str+= '	<p>	<img src=\"lib/images/6_LaLigne.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		un seul chiffre par ligne doit être présent.  Pour finaliser la ligne 4, seul le ‘5’ reste à placer dans la ligne.   \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_4()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_6()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}
function regle_page_6(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2> Un chiffre par case   </h2>\n' ;
str+= '	<p>	<img src=\"lib/images/7_LaCase.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		un seul chiffre par case doit être présent.  Pour finaliser la case, seul le ‘5’ reste à placer dans la case.   \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_5()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_7()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}
function regle_page_7(){
str="";
str+= '<div class=\"w3-container\">\n';
str+= '		<h2> Un chiffre par colonne   </h2>\n' ;
str+= '	<p>	<img src=\"lib/images/8_LaColonne.png\" width=300px; style=\"float:right;\">Le jeu est une grille composée de 9 lignes (bleu: 2), 9 colonnes (vert: B) et 9 cases (rouge: D4 à F6) composées elles même de 9 espaces. \n' ;
str+= '		un seul chiffre par colonne doit être présent.  Pour finaliser la colonne, seul le ‘6’ reste à placer dans la colonne.    \n' ;
str+='		</p></div>\n' ;
str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"regle_page_6()\">Précédent</button>\n' ;
//str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"regle_page_8()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#regles_container').html(str);	
	
}

function strategies_page_1(){
	openCity(event,'strategies')

str="";
str+= '<div class=\"w3-container\">\n';
str+=' <h2>Stratégie 1: Stratégie du choix unique</h2>\n' ;
str+= '	<h3></h3>\n' ;
str+= '    <p>1. Regarde dans chaque case, ligne et colonne</p>\n' ;
str+= '	<p>2. Cherche la cellule où un seul candidat n’est inscrit </p>\n' ;
str+='	<p>3.Transforme la possibilités en certitude (place le chiffre trouvé)</p>\n' ;
str+= '	<p>4. Élimine tous les candidats qui ne sont plus possibles d’après le chiffre placé avec certitude\n' ;
str+= ' </p>' ;

str+= '		<div class=\"w3-container\">\n' ;
//str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"strategies_page_2()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"strategies_page_2()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#strategies_container').html(str);	

	
}
function strategies_page_2(){
	//openCity(event,'strategies')

str="";
str+= '<div class=\"w3-container\">\n';
str+=' <h2>Stratégie 1: Stratégie du choix unique</h2><h3></h3>\n' ;

str+= '	<p>	Exemple:</p>';
str+= '<img src=\"lib/images/LeChiffreIsole.png\" width=400px; >';
str+='		<p>Cette stratégie est utilisée uniquement lorsque tous les candidats sont placés initialement dans la grille. </p></div>\n' ;

str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"strategies_page_1()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"strategies_page_3()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#strategies_container').html(str);	

}	
function strategies_page_3(){
	//openCity(event,'strategies')

str="";
str+= '<div class=\"w3-container\">\n';
str+=' <h2>Stratégie 2: Stratégies des candidats</h2>\n' ;

str+= '    <p>1. Place tous les candidats possible dans toutes les cases de la grille de Sudoku</p>\n' ;
str+= '	<p>2. Trouve la/les case(s) avec un seul candidat </p>\n' ;
str+='	<p>3. Transforme la possibilités en certitude (place le chiffre trouvé)</p>\n' ;
str+= '	<p>4. Élimine tous les candidats qui ne sont plus possibles d’après le chiffre placé avec certitude\n' ;
str+= 'Recommence l’étape 2 </p>' ;

str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"strategies_page_2()\">Précédent</button>\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"strategies_page_4()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#strategies_container').html(str);	

	
}
function strategies_page_4(){
	openCity(event,'strategies')

str="";
str+= '<div class=\"w3-container\">\n';
str+=' <h2>Stratégie 2: Stratégies des candidats</h2>\n' ;
str+= '	<p>	Exemple:</p>';
str+= '<img src=\"lib/images/12_LesPtChiffres.png\" width=600px; >';
str+='		<p>Avec seulement  les connaissances de cette case, il est possible de déterminer les trois chiffres possible pouvant être inscrit dans les espaces restantes. Avec les informations de toute la grille, il est possible d’imaginer d’être en mesure d’éliminer d’autre possibilités et ainsi pouvoir être certain de la position de tous les chiffres</p></div>\n' ;

str+= '		<div class=\"w3-container\">\n' ;
str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-left\" onclick=\"strategies_page_3()\">Précédent</button>\n' ;
//str+= '		<button class=\"w3-bar-item w3-button w3-teal w3-right\" onclick=\"strategies_page_2()\">Suivant</button>\n' ;
str+= '		</div>' ;
regles_container
$('#strategies_container').html(str);	
	
}

function profil_page(){
openCity(event,'profil')
str="";
str+= '<h2>Votre Profil</h2>\n' ;
str+= '    <p>Voici vos statistiques en tant qu\'apprenant</p>\n' ;
str+= '	<table class=\"w3-table w3-striped w3-bordered\">\n' ;
str+= '    <tr>\n' ;
str+= '      <th>Type d\'érreur</th>\n' ;
str+= '      <th>Fréquence</th>\n' ;
str+= '    </tr>\n' ;
str+= '    <tr>\n' ;
str+= '      <td>Erreur sur un candidat</td>\n' ;
str+= '      <td><span id=\"err_cand\">'+profil["err_cand"]+'</span></td>\n' ;
str+= '    </tr>\n' ;
str+= '    <tr>\n' ;
str+= '      <td>Erreur sur un chiffre certain</td>\n' ;
str+= '      <td><span id=\"err_chiffr\">'+profil["err_chiffr"]+'</span></td>\n' ;
str+= '    </tr>\n' ;
str+= '    <tr>\n' ;
str+= '      <td>Bon candidat</td>\n' ;
str+= '      <td><span id=\"bon_cand\" style=\"color:green\">'+profil["bon_cand"]+'</span></td>\n' ;
str+= '    </tr>\n' ;
str+= '    <tr>\n' ;
str+= '      <td>Bonne réponse certaine</td>\n' ;
str+= '      <td><span id=\"bon_rep\" style=\"color:green\">'+profil["bon_rep"]+'</span></td>\n' ;
str+= '    </tr>\n' ;
str+= '	<tr>\n' ;
var taux=0;
message_joueur="";
if(profil["err_cand"]+profil["err_chiffr"]+profil["bon_cand"]+profil["bon_rep"]!=0){
taux= parseInt((profil["bon_cand"]+profil["bon_rep"])*100/(profil["err_cand"]+profil["err_chiffr"]+profil["bon_cand"]+profil["bon_rep"]));
}

str+= '      <td>Taux de succès</td>\n' ;
str+= '      <td><span id=\"taux_succ\">'+taux+' %</span></td>\n' ;
str+= '    </tr>\n' ;
str+= '  </table>' ;
str+= '<br><b><div class=\"w3-container\" id=\"message_joueur\"></div></b>\n';

$('#profil_container').html(str);
if(taux<35){
	document.getElementById("taux_succ").style.color = "red";
	message_joueur="Vous êtes malheureusement sous la moyenne!<br>Si vous continuez à étudier les stratègies du tuteur vous serez capable de vous améliorer.";
	document.getElementById("message_joueur").style.color = "red";
}
if(taux>=35&&taux<70){
	document.getElementById("taux_succ").style.color = "#ff9933";
	message_joueur="Vous êtes dans la bonne voie!<br>Plus vous jouerai, plus vous améliorerez vos statistiques.";
	document.getElementById("message_joueur").style.color = "#ff9933";
	}
if(taux>=70){
	document.getElementById("taux_succ").style.color = "green";
	message_joueur="Bravo! Vous êtes au dessus de la moyenne!<br>Plus vous jouerai, plus vous améliorerez vos statistiques.";
	document.getElementById("message_joueur").style.color = "green";
	}
$('#message_joueur').html(message_joueur);
}
