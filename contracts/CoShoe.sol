pragma solidity >=0.5.0;

contract CoShoe{

    struct Shoe {
        address owner;
        string name;
        string image;
        bool sold;
    }


    // set price to 0.5 ether in wei
    uint price = 0.5*10**18 wei;
    uint shoesSold = 0;
    Shoe[] public shoes;
    // mapping(uint => Shoe) public shoeIdToShoe;

    constructor() public {
        for (uint i = 0; i < 100; i++) {
            Shoe memory shoe = Shoe(msg.sender,"","",false);
            shoes.push(shoe);

        }
    }

    function countShoes() public view returns (uint){
        return shoes.length;
    }

    function countShoesSold() public view returns (uint){
        return shoesSold;
    }

    function buyShoe(string memory _name, string memory _image) public payable {
        require(shoesSold<100 ,"No Shoes avaliable for purchase");
        require(msg.value == price,"Ether sent is not equal to shoe price");

        // Choosing which shoe to "buy." Logic only holds true on the assumption 
        //that there will onle be 100 CoShoes and 
        // the transferring of shoes between buyers is ingored in this scenario

        uint shoeId = 100 - 1 - shoesSold;
        Shoe storage shoe = shoes[shoeId];

        // set new paramaters for shoe
        shoe.owner = msg.sender;
        shoe.name = _name;
        shoe.image = _image;
        shoe.sold = true;

        // update shoeSold
        shoesSold++;


    }

    // check whther this needs view as well
    function checkPurchases() public view returns (bool[100] memory ) {

        // again assuming we only ever mint 100 tokens 
        bool[100] memory purchase_states;
        for (uint i = 0; i <100; i++) {
            purchase_states[i] = shoes[i].sold;

        }

        return purchase_states;
    }


}