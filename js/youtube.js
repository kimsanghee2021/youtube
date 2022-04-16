const api_key = 'AIzaSyBXcN2dhap7pG4dBHHa6NV25JXQB98JpZY';
const num = 5;

const vidid = 'PLyLpzOyPZPDySVKOdpOZPfo4IkSVp-4Gu';
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&maxResults=${num}&playlistId=${vidid}`;

//유튜브 데이터 호출
fetch(url)
	.then((res) => {
		console.log(res);
		return res.json();
	})
	.catch((err) => {
		console.log(err);
	})
	.then((json) => {		
		const items = json.items;
		console.log(items);

		//동적 유튜브 리스트 생성
		items.forEach((item, idx)=>{
			//Element Node 생성
			const main= document.querySelector('main');
			const article = document.createElement('article');
			const divPic = document.createElement('div');
			const a = document.createElement('a');
			const img = document.createElement('img');
			const divTxt = document.createElement('div');
			const h2 = document.createElement('h2');
			const p = document.createElement('p');
			const span = document.createElement('span');

			//문자열 가져오기
			let tit = item.snippet.title;
			let desc = item.snippet.description;
			let date = item.snippet.publishedAt;			

			//속성 노드 연결및 문자열 가공
			divPic.classList.add('pic');
			a.setAttribute('href', item.snippet.resourceId.videoId);
			img.setAttribute('src', item.snippet.thumbnails.standard.url);
			divTxt.classList.add('txt');
			h2.innerText = tit;
			p.innerText = desc.length>150 ? desc.substr(0,150)+'...' : desc;
			span.innerText = date.split('T')[0];

			//DOM에 Node binding
			main.append(article);
			article.append(divPic, divTxt);
			divPic.append(a);
			a.append(img);
			divTxt.append(h2,p,span);	
		})
		const main01 = document.getElementById('main');
		//부모 프레임에 이벤트 위임처리
		main01.addEventListener('click', e =>{
			e.preventDefault();

			//클릭한 대상이 a요소가 아니면 함수 종료
			if(e.target.parentNode.nodeName !== 'A') return;
			//영상의 id값 저장
			const vidId = e.target.closest('a').getAttribute('href');

			//pop dom구조 생성후
			const asidePop = document.createElement('aside');
			const divCon = document.createElement('div');
			const iframeVid = document.createElement('iframe');
			const span = document.createElement('span');

			//속성연결
			asidePop.classList.add('pop');
			divCon.classList.add('con');
			iframeVid.setAttribute('src', 'https://www.youtube.com/embed/'+vidId);
			span.innerText='close';

			//dom binding
			document.body.append(asidePop);
			asidePop.append(divCon, span);
			divCon.append(iframeVid);
		})

	});
