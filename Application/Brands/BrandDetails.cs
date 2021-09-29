using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Brands
{
    public class BrandDetails
    {
        public class Query : IRequest<Brand>
        {
            public Guid BrandId{get; set;}
        }

        public class Handler : IRequestHandler<Query, Brand>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context=context;   
            }
            public async Task<Brand> Handle(Query request, CancellationToken cancellationToken)
            {
                var brand = await _context.Brand.FindAsync(request.BrandId);
                if (brand == null)
                    throw new RestException(HttpStatusCode.NotFound, new { brand = "Not found" });
                
                return brand;
            }

            
        }

    }
}