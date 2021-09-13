using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Brands
{
    public class CreateBrand
    {
        public class Command : IRequest
        {
            public Guid BrandId{get; set;}
            public string BrandName{get; set;}
            
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
                var brands = new Brand
                {
                    BrandId = request.BrandId,
                    BrandName = request.BrandName,
                };

                _context.Brand.Add(brands); 
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}