// Cookie clicker player
/* globals Game */

function CookieBuster() {
  this.bigCookie = null
  this.bigCookieClickTimeout = 50
  this.enabled = false
  this.cpsRatio = 0.05
  this.eldersUpgrades = {}
}

CookieBuster.prototype.start = function () {
  this.disableElders()
  this.enabled = true
  this.bigCookie = this.getCookieElement()
  this.tick()
}

CookieBuster.prototype.stop = function () {
  this.enabled = false
}

CookieBuster.prototype.getCookieElement = function () {
  return document.querySelector('#bigCookie')
}

CookieBuster.prototype.clickBigCookie = function () {
  if (this.bigCookie) {
    this.bigCookie.click()
  }
}

CookieBuster.prototype.clickShimmer = function () {
  const shimmer = document.querySelector('.shimmer')
  if (shimmer) {
    shimmer.click()
  }
}

CookieBuster.prototype.buyUpgrade = function () {
  const upgrade = document.querySelector('.crate.upgrade.enabled')
  if (upgrade) {
    upgrade.click()
  }
}

CookieBuster.prototype.disableElders = function () {
  this.eldersUpgrades[333] = Game.UpgradesById[333].buy
  this.eldersUpgrades[84] = Game.UpgradesById[84].buy
  this.eldersUpgrades[74] = Game.UpgradesById[74].buy

  Game.UpgradesById[333].buy = Game.UpgradesById[84].buy = Game.UpgradesById[74].buy = () => { }
}

CookieBuster.prototype.enableElders = function () {
  Game.UpgradesById[333].buy = this.eldersUpgrades[333]
  Game.UpgradesById[84].buy = this.eldersUpgrades[84]
  Game.UpgradesById[84].buy = this.eldersUpgrades[74]
}

CookieBuster.prototype.buyProduct = function () {
  const products = document.querySelectorAll('.product.unlocked.enabled')
  if (products.length !== 0) {
    const globalCps = Game.cookiesPs
    for (let i = products.length - 1; i >= 0; i -= 1) {
      const product = products[i]
      const productId = Number(product.id.replace('product', ''))
      const productObj = Game.ObjectsById[productId]
      const productCps = productObj.storedTotalCps / productObj.amount * Game.globalCpsMult
      if ((globalCps * this.cpsRatio) < productCps || isNaN(productCps)) {
        product.click()
      }
    }
  }
}

CookieBuster.prototype.tick = function () {
  if (this.enabled) {
    this.clickBigCookie()
    this.clickShimmer()
    this.buyUpgrade()
    this.buyProduct()
    setTimeout(() => this.tick(), this.bigCookieClickTimeout)
  }
}
