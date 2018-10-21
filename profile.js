var username = '';
var level = 1;
var previousLevel = 0;
var nextLevel = 100;
var points = 0;
var progress = 0;

function show_profile() {
	var conteudo = document.querySelector('.navbar + div');
	var container = document.createElement('div');
	conteudo.parentElement.insertBefore(container,conteudo);
	container.className = 'container';
	container.innerHTML = 
'	<div class="row profile">'
+'		<div class="col-md-3">'
+'			<div class="profile-sidebar">'
+'				<!-- foto -->'
+'				<div class="profile-userpic" style="text-align: center">'
+'					<img src="images/user.svg" class="img-responsive" alt="">'
+'				</div>'
+'				<!-- texto -->'
+'				<div class="profile-usertitle">'
+'					<div id="nome" class="profile-usertitle-name">'+username+'</div>'
+'					<div id="nivel" class="profile-usertitle-job">Level '+level+'</div>'
+'				</div>'
+''
+'				<div class="progress">'
+'				  <div id="progresso" class="progress-bar" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width:'+progress+'%"></div>'
+'				</div>'
+'				<span id="pontos">'+points+' points</span>'
+''
+'				<div class="profile-userbuttons">'
+'					<button type="button" class="btn btn-success btn-sm" onclick="addPoints(Math.round(Math.random()*20)+10)">My profile</button>'
+'					<a href="ranking.html" class="btn btn-success btn-sm">Ranking</a>'
+'				</div>'
+'				<!-- menu -->'
+'				<div class="profile-usermenu">'
+'					<ul class="nav">'
+'						<li class="active">'
+'							<a href="quiz.html">'
+'							<span class="glyphicon glyphicon-home"></span>'
+'							Challanges </a>'
+'						</li>'
+'						<li>'
+'							<a href="to-do.html">'
+'							<span class="glyphicon glyphicon-user"></span>'
+'							Activities </a>'
+'						</li>'
+'						<li>'
+'							<a href="sugestao.html">'
+'							<span class="glyphicon glyphicon-flag"></span>'
+'							Help us </a>'
+'						</li>'
+'					</ul>'
+'				</div>'
+'				<!-- fim menu -->'
+'				<h3 class="mt-3">Content</h3>'
+'				<hr>'
+'				<h4>Atmosphere</h4>'
+'				<ul>'
+'					<li><a href="atmosfera.html">What is it?</a></li>'
+'					<li><a href="atmosfera2.html">What is it made of?</a></li>'
+'					<li><a href="atmosfera3.html">How important is the atmosphere?</a></li>'
+'					<li><a href="atmosfera4.html">Layes of the Atmosphere</a></li>'
+'				</ul>'
+'			</div>'
+'		</div>'
+'		<div class="col-md-9">'
+'			<div class="profile-content">'
+'			<!-- conteúdo -->'
+'			</div>';
	container.querySelector('.profile-content').appendChild(conteudo);

	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'profile.css';
	document.head.appendChild(link);
}

if (!document.body)
	window.onload=((ol)=>{return ()=>{
		show_profile();
		loadProfile();
		ol && ol();
	}})(window.onload);
else {
	show_profile();
	window.onload=((ol)=>{return ()=>{
		loadProfile();
		ol && ol();
	}})(window.onload);
}

function update_profile() {
	document.getElementById('nome').textContent = username;
	document.getElementById('nivel').textContent = 'Level '+level;
	document.getElementById('progresso').style.width = progress+'%';
	document.getElementById('progresso').setAttribute('aria-valuenow',progress);
	saveProfile();
}

function update_points(target) {
	points += Math.ceil(Math.abs(target - points) / 10) * Math.sign(target - points);
	document.getElementById('pontos').textContent = points+' points';
	if (points == target) return;
	setTimeout(()=>{update_points(target)}, 40);
}

function run_particles(count) {
	var d = document.createElement('div');
	d.className = 'particle-div';
	d.style.transform = 'rotate('+(Math.random()*360)+'deg)';

	var p = document.createElement('img');
	p.src = 'star.svg';
	p.className = 'particle';
	
	d.appendChild(p);
	
	var o = document.getElementById('nivel');

	o.parentElement.insertBefore(d,o);

	setTimeout(()=>{d.parentElement.removeChild(d)}, 4000);

	if (count > 0)
		setTimeout(()=>{run_particles(count-1)},200);
}

function addLevel() {
	level++;
	var pointsNeeded = (nextLevel - previousLevel) + 50;
	previousLevel = nextLevel;
	nextLevel += pointsNeeded;
	progress = 100 * (points - previousLevel) / (nextLevel - previousLevel);
	update_profile();
	run_particles(10);
}

function addPoints(num) {
	progress = (points + num - previousLevel) / (nextLevel - previousLevel);
	if (progress >= 1) {
		progress = 100;
		setTimeout(addLevel, 500);
	}
	progress *= 100;
	update_profile();
	update_points(points + num);
}

function saveProfile() {
	window.localStorage.setItem('username',username);
	window.localStorage.setItem('level',level);
	window.localStorage.setItem('previousLevel',previousLevel);
	window.localStorage.setItem('nextLevel',nextLevel);
	window.localStorage.setItem('points',points);
	window.localStorage.setItem('progress',progress);
}

function loadProfile() {
	username = window.localStorage.getItem('username');
	if (username == null) return;
	level = 0|window.localStorage.getItem('level');
	previousLevel = 0|window.localStorage.getItem('previousLevel');
	nextLevel = 0|window.localStorage.getItem('nextLevel');
	points = 0|window.localStorage.getItem('points');
	progress = 0|window.localStorage.getItem('progress');
	addPoints(0);
}

function resetProfile() {
	window.localStorage.removeItem('username');
	window.localStorage.removeItem('level');
	window.localStorage.removeItem('previousLevel');
	window.localStorage.removeItem('nextLevel');
	window.localStorage.removeItem('points');
	window.localStorage.removeItem('progress');
}