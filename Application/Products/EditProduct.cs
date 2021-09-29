using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class EditProduct
    {
        public class Command : IRequest
        {
            public Guid ProductId { get; set; }

            public string ProductName { get; set; }
            public string Sector { get; set; }
            public string Brand { get; set; }

            public float? ValueOfProduct { get; set; }

            public DateTime? ModelYear { get; set; }

            public string PhotoFileName { get; set; }

            public int? Quantity { get; set; }

            public string Description { get; set; }


        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ProductName).NotEmpty();
                RuleFor(x => x.ValueOfProduct).NotEmpty();
                RuleFor(x => x.Quantity).NotEmpty();
                RuleFor(x => x.Sector).NotEmpty();
                RuleFor(x => x.Brand).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.ModelYear).NotEmpty();
                RuleFor(x => x.PhotoFileName).NotEmpty();

            }
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

                var product = await _context.Product.FindAsync(request.ProductId);

                if(product==null)
                
                throw new RestException(HttpStatusCode.NotFound, new {product = "Not found"});

                product.ProductName = request.ProductName ?? product.ProductName;
                product.Sector = request.Sector ?? product.Sector;
                product.Brand = request.Brand ?? product.Brand;
                product.ValueOfProduct = request.ValueOfProduct ?? product.ValueOfProduct;
                product.ModelYear = request.ModelYear ?? product.ModelYear;
                product.PhotoFileName = request.PhotoFileName ?? product.PhotoFileName;
                product.Quantity = request.Quantity ?? product.Quantity;
                product.Description = request.Description ?? product.Description;





                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}