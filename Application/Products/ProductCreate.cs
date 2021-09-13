using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class ProductCreate
     {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context=context;   
            }
           

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var products = new Product
                {
                    ProductId = request.ProductId,
                    ProductName = request.ProductName,
                    Sector=request.Sector,
                    Brand = request.Brand,
                    ValueOfProduct=request.ValueOfProduct,
                    ModelYear = request.ModelYear,
                    PhotoFileName = request.PhotoFileName,
                    Quantity = request.Quantity,
                    Description = request.Description
                    
                };

                _context.Product.Add(products); 
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}