const api_key = 'AIzaSyBXcN2dhap7pG4dBHHa6NV25JXQB98JpZY';
const num = 5;
const vidid = 'PLyLpzOyPZPDySVKOdpOZPfo4IkSVp-4Gu';
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&maxResults=${num}&playlistId=${vidid}`;

fetch(url)
	.then((res) => {
		console.log(res);
		return res.json();
	})        
	.catch((err) => {
		console.log(err);
	})
	.then((json) => {    
		const items= json.items;
		console.log(items);

		items.forEach((item, idx)=>{
			const main = document.querySelector('main');
			const article = document.createElement('article');
			const divPic = document.createElement('div');
			const a = document.createElement('a');
			const img = document.createElement('img');
			const divTxt = document.createElement('div');
			const h2 = document.createElement('h2');
			const p = document.createElement('p');
			const span = document.createElement('span');

			let tit = item.snippet.title;
			let desc = item.snippet.description;
			let date = item.snippet.publishedAt;

			divPic.classList.add('pic');
			a.setAttribute('href',item.snippet.resourceId.videoId);
			img.setAttribute('src',item.snippet.thumbnails.standard.url);
			divTxt.classList.add('txt');
			h2.innerText = tit;
			p.innerText= desc.length>150 ? desc.substr(0,150) + '...' : desc;
			span.innerText = desc.split('T')[0];


			main.append(article);
			article.append(divPic,divTxt);
			divPic.append(a);
			a.append(img);
			divTxt.append(h2,p,span);
		});
	});