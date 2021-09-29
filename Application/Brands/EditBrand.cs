using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Brands
{
    public class EditBrand
    {
        public class Command : IRequest
        {
            public Guid BrandId { get; set; }

            public string BrandName { get; set; }


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

                var brand = await _context.Brand.FindAsync(request.BrandId);

                if (brand == null)
                    throw new RestException(HttpStatusCode.NotFound, new { brand = "Not found" });

                brand.BrandName = request.BrandName ?? brand.BrandName;


                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}