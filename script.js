function id(id){
  return document.getElementById(id);
}
//Theme
var mode = 1;
if(localStorage.getItem('theme') != null){
  mode = localStorage.getItem('theme');
}
function theme(){
  if(mode == 1){
    id('head').className = 'box_dark';
    id('main').className = 'box_dark';
    id('body').className = 'body_dark';
  }
  else{
    id('head').className = 'box_light';
    id('main').className = 'box_light';
    id('body').className = 'body_light';
  }
}
function theme_switch(){
  if(mode == 0) mode = 1;
  else mode = 0;
  theme();
  localStorage.setItem('theme', mode);
}
function onlynumber(e){
  var theEvent = e || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[^0-9]/g;
  if(regex.test(key)){
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
function nopaste(e){
  e.preventDefault();
}
function calculate(){
  //Exploit Proof Input
  if(id('strength').value < 0) id('strength').value = 0;
  else if(id('strength').value > 50000) id('strength').value = 50000;
  if(id('mastery').value < 0) id('mastery').value = 0;
  else if(id('mastery').value > 20000) id('mastery').value = 20000;
  if(id('ap_from_gear').value < 0) id('ap_from_gear').value = 0;
  else if(id('ap_from_gear').value > 1000) id('ap_from_gear').value = 1000;
  if(id('strength').value[0] == '0') id('strength').value = '';
  if(id('mastery').value[0] == '0') id('mastery').value = '';
  if(id('ap_from_gear').value[0] == '0') id('ap_from_gear').value = '';
  if(id('swordguard').checked && id('synapse').checked){
    id('alchemy_bonus_80').disabled = true;
    id('alchemy_bonus_90').disabled = true;
    id('alchemy_bonus_80').checked = false;
    id('alchemy_bonus_90').checked = false;
  }
  else if(id('synapse').checked && id('alchemy_bonus_80').checked || id('synapse').checked && id('alchemy_bonus_90').checked){
    id('swordguard').disabled = true;
    id('swordguard').checked = false;
  }
  else if(id('alchemy_bonus_80').checked && id('swordguard').checked || id('alchemy_bonus_90').checked && id('swordguard').checked){
    id('synapse').disabled = true;
    id('synapse').checked = false;
  }
  else{
    id('alchemy_bonus_80').disabled = false;
    id('alchemy_bonus_90').disabled = false;
    id('swordguard').disabled = false;
    id('synapse').disabled = false;
  }
  if(id('level_select').options[id('level_select').selectedIndex].value == 80){
    id('t2_select').options[0].selected = true;
    id('t2_select').disabled = true;
    id('swordguard_dual').innerHTML = ' Swordguard Embroidery (400 Attack Power) ';
    id('setbonus').disabled = true;
    id('setbonus').value = 0;
    id('lvl90').style.display = 'none';
    id('lvl80').style.display = 'block';
    id('flask_90').checked = false;
    id('food_90').checked = false;
    id('potion_90').checked = false;
    id('plus_ap').style.display = 'block';
    id('t2_toggle').disabled = true;
    id('brutal_talisman1').style.display = 'none';
    id('feather_n1').style.display = 'none';
    id('feather_hc1').style.display = 'none';
    id('galakras_n1').style.display = 'none';
    id('galakras_hc1').style.display = 'none';
    id('thok_n1').style.display = 'none';
    id('thok_hc1').style.display = 'none';
    id('greatness1').style.display = 'block';
  }
  else{
    id('t2_select').disabled = false;
    id('swordguard_dual').innerHTML = ' Swordguard Embroidery (4000 Attack Power) ';
    id('setbonus').disabled = false;
    id('lvl80').style.display = 'none';
    id('lvl90').style.display = 'block';
    id('flask_80').checked = false;
    id('food_80').checked = false;
    id('potion_80').checked = false;
    id('plus_ap').style.display = 'none';
    id('ap_from_gear').value = '';
    id('t2_toggle').disabled = false;
    id('feather_n1').style.display = 'block';
    id('feather_hc1').style.display = 'block';
    id('galakras_n1').style.display = 'block';
    id('galakras_hc1').style.display = 'block';
    id('thok_n1').style.display = 'block';
    id('thok_hc1').style.display = 'block';
    id('greatness1').style.display = 'none';
  }
  //Basics
  var level = id('level_select').options[id('level_select').selectedIndex].value;
  var strength = id('strength').value*1;
  if(level == 90 && strength < 286) strength = 286;
  else if(level == 80 && strength < 317) strength = 317;
  var mastery_ratio = 240;
  if(level == 80) mastery_ratio = 18.3625;
  var base_mastery = id('mastery').value*1;
  //Trinkets
  var opt1 = id('t1_select').options[id('t1_select').selectedIndex].value;
  var opt2 = id('t2_select').options[id('t2_select').selectedIndex].value;
  var opt1_id = id('t1_select').options[id('t1_select').selectedIndex].id;
  var opt2_id = id('t2_select').options[id('t2_select').selectedIndex].id;
  var t1_mod = id('t1_mod').checked;
  var t2_mod = id('t2_mod').checked;
  var t1_str = 0;
  var t2_str = 0;
  var amplify = 1;
  //Exploit
  for(var i = 1; i < id('t1_select').length; i++){
    if(opt1 == id('t2_select').options[i].value){
      id(id('t2_select').options[i].id).disabled = true;
    }
    else{
      id(id('t2_select').options[i].id).disabled = false;
    }
  }
  for(var i = 1; i < id('t2_select').length; i++){
    if(opt2 == id('t1_select').options[i].value){
      id(id('t1_select').options[i].id).disabled = true;
    }
    else{
      id(id('t1_select').options[i].id).disabled = false;
    }
  }
  //Thunderforged, Warforged
  //T1
  if(opt1 == 'feather'){
    id('t1_mod_label').innerHTML = ' Thunderforged';
    id('t1_mod_box').style.display = 'block';
  }
  else if(opt1 == 'galakras' || opt1 == 'thok'){
    id('t1_mod_label').innerHTML = ' Warforged';
    id('t1_mod_box').style.display = 'block';
  }
  else{
    id('t1_mod_box').style.display = 'none';
    id('t1_mod').checked = false;
  }
  //T2
  if(opt2 == 'feather'){
    id('t2_mod_label').innerHTML = ' Thunderforged';
    id('t2_mod_box').style.display = 'block';
  }
  else if(opt2 == 'galakras' || opt2 == 'thok'){
    id('t2_mod_label').innerHTML = ' Warforged';
    id('t2_mod_box').style.display = 'block';
  }
  else{
    id('t2_mod_box').style.display = 'none';
    id('t2_mod').checked = false;
  }
  //Trinket Procs
  //T1
  if(id('t1_toggle').checked){
    switch(opt1_id){
      case 'greatness1':{
        t1_str = 300;
        break;
      }
      case 'brutal_talisman1':{
        t1_str = 9483;
        break;
      }
      case 'feather_n1':{
        if(!t1_mod) t1_str = 14360;
        else t1_str = 15190;
        break;
      }
      case 'feather_hc1':{
        if(!t1_mod) t1_str = 16220;
        else t1_str = 17150;
        break;
      }
      case 'galakras_n1':{
        if(!t1_mod) t1_str = 13652;
        else t1_str = 14436;
        break;
      }
      case 'galakras_hc1':{
        if(!t1_mod) t1_str = 15409;
        else t1_str = 16295;
        break;
      }
      case 'thok_n1':{
        if(!t1_mod) t1_str = 13652;
        else t1_str = 14436;
        break;
      }
      case 'thok_hc1':{
        if(!t1_mod) t1_str = 15409;
        else t1_str = 16295;
        break;
      }
    }
  }
  //T2
  if(id('t2_toggle').checked){
    switch(opt2_id){
      case 'brutal_talisman2':{
        t2_str = 9483;
        break;
      }
      case 'feather_n2':{
        if(!t2_mod) t2_str = 14360;
        else t2_str = 15190;
        break;
      }
      case 'feather_hc2':{
        if(!t2_mod) t2_str = 16220;
        else t2_str = 17150;
        break;
      }
      case 'galakras_n2':{
        if(!t2_mod) t2_str = 13652;
        else t2_str = 14436;
        break;
      }
      case 'galakras_hc2':{
        if(!t2_mod) t2_str = 15409;
        else t2_str = 16295;
        break;
      }
      case 'thok_n2':{
        if(!t2_mod) t2_str = 13652;
        else t2_str = 14436;
        break;
      }
      case 'thok_hc2':{
        if(!t2_mod) t2_str = 15409;
        else t2_str = 16295;
        break;
      }
    }
  }
  //Amplify
  if(opt1 == 'thok' || opt2 == 'thok') id('amplify_box').style.display = 'block';
  else{
    id('amplify_box').style.display = 'none';
    id('amplify').checked = true;
  }
  if(id('amplify').checked){
    if(opt1 == 'thok'){
      switch(opt1_id){
        case 'thok_n1':{
          if(!t1_mod) amplify = 1.081264;
          else amplify = 1.085937;
          break;
        }
        case 'thok_hc1':{
          if(!t1_mod) amplify = 1.091729;
          else amplify = 1.097003;
          break;
        }
      }
    }
    else if(opt2 == 'thok'){
      switch(opt2_id){
        case 'thok_n2':{
          if(!t2_mod) amplify = 1.081264;
          else amplify = 1.085937;
          break;
        }
        case 'thok_hc2':{
          if(!t2_mod) amplify = 1.091729;
          else amplify = 1.09699;
          break;
        }
      }
    }
  }
  //Modifiers
  var horn = 1;
  var statbuff = 1;
  var masterybuff = 0;
  var swordguard = 0;
  var synapse = 0;
  var fallen_crusader = 1;
  var trick = 1;
  var flask = 0;
  var food = 0;
  var potion = 0;
  var setbonus_mastery = 0;
  var ap_from_gear = id('ap_from_gear').value*1;
  if(id('horn').checked) horn = 1.1;
  if(id('statbuff').checked) statbuff = 1.05;
  if(id('masterybuff').checked) masterybuff = 3000;
  if(id('swordguard').checked){
    if(level == 90) swordguard = 4000;
    else if(level == 80) swordguard = 400;
  }
  if(id('synapse').checked) synapse = 1920;
  if(id('fallen_crusader').checked) fallen_crusader = 1.15;
  if(id('trick').checked) trick = 1.15;
  if(level == 90){
    if(id('flask_90').checked){
      flask = 1000;
      id('alchemy_bonus_box_90').style.display = 'block';
    }
    else{
      id('alchemy_bonus_box_90').style.display = 'none';
      id('alchemy_bonus_90').checked = false;
    }
    if(id('alchemy_bonus_90').checked) flask = 1320;
    if(id('food_90').checked) food = 300;
    if(id('potion_90').checked) potion = 4000;
  }
  else if(level == 80){
    if(id('flask_80').checked){
      flask = 300;
      id('alchemy_bonus_box_80').style.display = 'block';
    }
    else{
      id('alchemy_bonus_box_80').style.display = 'none';
      id('alchemy_bonus_80').checked = false;
    }
    if(id('alchemy_bonus_80').checked) flask = 380;
    if(id('food_80').checked) food = 77;
    if(id('potion_80').checked) potion = 1200;
  }
  id('display_stack').innerHTML = id('setbonus').value;
  setbonus_mastery = id('setbonus').value*500;
  //Results
  var nc_str = (strength + flask*1.35*1.05 + food*1.35*1.05)*statbuff;
  var nc_ap = ((level*3)+(nc_str*2-20)+ap_from_gear)*horn;
  var nc_mastery = ((base_mastery+masterybuff)*amplify/mastery_ratio)+20;
  var nc_bp = (197+nc_ap*0.158)*1.6*(nc_mastery/100+1)*trick;
  var nc_ff = (166+nc_ap*0.158)*1.6*trick;
  if(level == 80){
    nc_bp = (160+nc_ap*0.158)*1.6*(nc_mastery/100+1)*trick;
    nc_ff = (134+nc_ap*0.158)*1.6*trick;
  }
  var max_str = (strength + t1_str*1.35*1.05 + t2_str*1.35*1.05 + flask*1.35*1.05 + food*1.35*1.05 + potion*1.35*1.05 + synapse*1.35*1.05)*statbuff*fallen_crusader;
  var max_ap = ((level*3)+(max_str*2-20)+swordguard+ap_from_gear)*horn;
  var max_mastery = ((base_mastery+setbonus_mastery+masterybuff)*amplify/mastery_ratio)+20;
  var max_bp = (197+max_ap*0.158)*1.6*(max_mastery/100+1)*trick;
  var max_ff = (166+max_ap*0.158)*1.6*trick;
  if(level == 80){
    max_bp = (160+max_ap*0.158)*1.6*(max_mastery/100+1)*trick;
    max_ff = (134+max_ap*0.158)*1.6*trick;
  }
  //Output
  id('nc_title').innerHTML = 'Non-Combat Statistics';
  id('nc_str').innerHTML = 'Strength: ' + Math.round(nc_str);
  id('nc_ap').innerHTML = 'Attack Power: ' + Math.round(nc_ap);
  id('nc_mastery').innerHTML = 'Mastery: ' + Math.round(nc_mastery*1000)/1000 + '%';
  id('nc_bp').innerHTML = '<img src="./img/bp.jpg" class="icon"> Blood Plague: ' + Math.round(nc_bp);
  id('nc_ff').innerHTML = '<img src="./img/ff.jpg" class="icon"> Frost Fever: ' + Math.round(nc_ff);
  id('burst_title').innerHTML = 'Burst Statistics';
  id('max_str').innerHTML = 'Maximum Strength: ' + Math.round(max_str);
  id('max_ap').innerHTML = 'Maximum Attack Power: ' + Math.round(max_ap);
  id('max_mastery').innerHTML = 'Mastery: ' + Math.round(max_mastery*1000)/1000 + '%';
  id('max_bp').innerHTML = '<img src="./img/bp.jpg" class="icon"> Maximum Blood Plague: ' + Math.round(max_bp);
  id('max_ff').innerHTML = '<img src="./img/ff.jpg" class="icon"> Maximum Frost Fever: ' + Math.round(max_ff);

}
