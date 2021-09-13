using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Products
{
    public class List
    {
        public class Query : IRequest<List<Product>> { }

        public class Handler : IRequestHandler<Query, List<Product>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.Product.ToListAsync();

                return products;
            }
        }
    }
}