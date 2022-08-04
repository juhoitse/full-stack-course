const dummy = (blogs) => {

	return Number(blogs === blogs)
}

const mostBlogs = (blogs) => {
	const authorArr = blogs.map( blog => blog.author)
	const author = [...authorArr].sort((a,b) =>
		authorArr.filter(c => c===a).length - authorArr.filter(c => c===b).length )
		.pop()
	let count = 0
	for(const a of authorArr) {
		if(a === author) {
			count++
		}
	}
	return { author: author, blogs: count}
}

const mostLikes = (blogs) => {
	const uniqueAuthorArr = blogs.map( blog => blog.author).filter((v, i, a) => a.indexOf(v) === i)
	const authorArr = blogs.map( blog => blog.author)
	const likeArr = new Array(uniqueAuthorArr.length).fill(0)
	//console.log(likeArr)
	for(let i = 0; i < authorArr.length; i++) {
		for(let j = 0; j < uniqueAuthorArr.length; j++) {
			if(authorArr[i] === uniqueAuthorArr[j]) {
				likeArr[j] += Number(blogs[i].likes)
				//console.log(uniqueAuthorArr[j], blogs[i].likes)
			}
		}
	}
	const likes = Math.max(...likeArr)
	const author = uniqueAuthorArr[likeArr.indexOf(likes)]
	return { author: author, likes: likes }
}


const totalLikes = (blogs) => {
	let likes = 0
	for(const blog of blogs) {
		likes += blog.likes
	}
	return likes
}

module.exports = {
	dummy,
	totalLikes,
	mostBlogs,
	mostLikes
}
