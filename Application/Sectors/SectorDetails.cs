using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sectors
{
    public class SectorDetails
    {
        public class Query : IRequest<Sector>
        {
            public Guid SectorId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Sector>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Sector> Handle(Query request, CancellationToken cancellationToken)
            {
                var sector = await _context.Sector.FindAsync(request.SectorId);
                if (sector == null)
                    throw new RestException(HttpStatusCode.NotFound, new { sector = "Not found" });
                return sector;
            }


        }

    }
}