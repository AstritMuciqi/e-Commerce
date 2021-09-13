using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sectors
{
    public class SectorDetails
    {
        public class Query : IRequest<Sector>
        {
            public Guid SectorId{get; set;}
        }

        public class Handler : IRequestHandler<Query, Sector>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context=context;   
            }
            public async Task<Sector> Handle(Query request, CancellationToken cancellationToken)
            {
                var sectors = await _context.Sector.FindAsync(request.SectorId);
                
                return sectors;
            }

            
        }

    }
}