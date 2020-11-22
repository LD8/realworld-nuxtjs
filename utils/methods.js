import { favorite, unfavorite } from '@/api/article'

export const favOrUnfavArticle = async function(article) {
  article.favoriteDisabled = true
  if (article.favorited) {
    // 取消点赞
    await unfavorite(article.slug)
    article.favorited = false
    article.favoritesCount -= 1
  } else {
    // 点赞
    await favorite(article.slug)
    article.favorited = true
    article.favoritesCount += 1
  }
  article.favoriteDisabled = false
}
