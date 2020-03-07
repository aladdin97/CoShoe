//import truffle assertions
const truffleAssert = require('truffle-assertions')

// import the contract artifact 
const CoShoe  = artifacts.require('./CoShoe.sol')

// test starts here
contract('CoShoe', function (accounts) {
    // predefine the contract instance
    let CoShoeInstance
  
    // before each test, create a new contract instance
    beforeEach(async function () {
        CoShoeInstance = await CoShoe.new()
    })

    it('should mint 100 CoShoe tokens on deployment', async function () {
        // minter is a public variable in the contract so you can get it directly via the created call function
        let no_shoes = await CoShoeInstance.countShoes()
        assert.equal(no_shoes, 100, "100 tokens were not correctly minted on deployment")  
      })


    it('should be able to transfer ownership and correctly set the name, image, sold and updates shoesSold', async function () {
        await CoShoeInstance.buyShoe("Mike","www.mikesKicks.com", {"from": accounts[0],"value":0.5e18})
    
        let bought_shoe = await CoShoeInstance.shoes(99)
        let no_shoes_bought = await CoShoeInstance.countShoesSold()

        assert.equal(bought_shoe.owner.toString(), accounts[0], "Ownership was not correctly transferred")
        assert.equal(bought_shoe.name, "Mike", "Name was not correctly set")
        assert.equal(bought_shoe.image, "www.mikesKicks.com", "Image url was not correctly set")
        assert.equal(bought_shoe.sold, true, "Sold was not correctly set")

        assert.equal(no_shoes_bought, 1, "shoesSold did not update")
      })

      it('should revert if caller of buyShoe does not send eth equal to price', async function () {
  
        await truffleAssert.reverts(CoShoeInstance.buyShoe("Mike","www.mikesKicks.com", {"from": accounts[0],"value":0.6e18}))
      })


      it('should return the correct number of trues when checkPurchases is run', async function () {

        await CoShoeInstance.buyShoe("Mike","www.mikesKicks.com", {"from": accounts[0],"value":0.5e18})
        let purchases = await CoShoeInstance.checkPurchases()

        // count number of trues in purchases array and store in no_trues variable 
        let no_trues = purchases.filter(x => x==true).length

        assert(no_trues,1,"Incorrect number of purchases in array returned by checkPurchases")
      })

})