using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class ProductDetails
    {
        public class Query : IRequest<Product>
        {
            public Guid ProductId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Product.FindAsync(request.ProductId);
                if (product == null)
                    throw new RestException(HttpStatusCode.NotFound, new { product = "Not found" });
                return product;
            }
        }

    }
}