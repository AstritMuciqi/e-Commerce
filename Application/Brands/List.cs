using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Brands
{
    public class List
    {
        public class Query : IRequest<List<Brand>> { }

        public class Handler : IRequestHandler<Query, List<Brand>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Brand>> Handle(Query request, CancellationToken cancellationToken)
            {
                var brands = await _context.Brand.ToListAsync();

                return brands;
            }

           
        }
    }
}