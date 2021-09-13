using System;


namespace Domain
{
    public class Product
    {
        
        public Guid ProductId{get; set;}

        public string ProductName{get; set;}
        public string Sector{get;set;}
        public string Brand{get;set;}

        public float ValueOfProduct{get; set;}

        public DateTime ModelYear{get; set;}

        public string PhotoFileName{get; set;}

        public int Quantity{get; set;}

        public string Description{get; set;}

        
    }
}