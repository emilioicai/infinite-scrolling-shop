import 'isomorphic-fetch'

export function fetchAciis(limit = 20, skip = 0, sortBy = 'id') {
	return fetch(`/api/products?limit=${limit}&skip=${skip}&sort=${sortBy}`).then(function(response) {
		const parseJSON = function(s) {
			if(typeof s === 'string' && s.length > 0 && s.indexOf('{') === 0) return JSON.parse(s);
		}
		return response.text().then((text) => {
			let asciis = [];
			try {
				const lines = text.split('\n');
				for(let i = 0; i < lines.length; i++) {
					asciis.push(JSON.parse(lines[i]))
				}
			}
			catch (e) {}
			return asciis;
		});
	});
}