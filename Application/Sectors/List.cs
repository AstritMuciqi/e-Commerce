
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Sectors
{
    public class List
    {
        public class Query : IRequest<List<Sector>> { }

        public class Handler : IRequestHandler<Query, List<Sector>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Sector>> Handle(Query request, CancellationToken cancellationToken)
            {
                var sectors = await _context.Sector.ToListAsync();

                return sectors;
            }
        }
    }
}