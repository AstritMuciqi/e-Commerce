using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Sectors
{
    public class EditSector
    {
        public class Command : IRequest
        {
            public Guid SectorId { get; set; }

            public string SectorName { get; set; }


        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var sector = await _context.Sector.FindAsync(request.SectorId);

                if (sector == null)
                    throw new RestException(HttpStatusCode.NotFound, new { sector = "Not found" });

                sector.SectorName = request.SectorName ?? sector.SectorName;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}