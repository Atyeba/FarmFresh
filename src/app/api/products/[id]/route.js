import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const result = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;
    
    if (result.length === 0) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Build dynamic update query
    const updateFields = [];
    const values = [];
    let paramCount = 1;
    
    const allowedFields = ['name', 'description', 'price', 'unit', 'category', 'emoji', 'stock_quantity'];
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateFields.push(`${field} = $${paramCount}`);
        values.push(body[field]);
        paramCount++;
      }
    }
    
    if (updateFields.length === 0) {
      return Response.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    // Add updated_at timestamp
    updateFields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    paramCount++;
    
    // Add id for WHERE clause
    values.push(id);
    
    const query = `
      UPDATE products 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount}
      RETURNING *
    `;
    
    const result = await sql(query, values);
    
    if (result.length === 0) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return Response.json(result[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const result = await sql`
      DELETE FROM products WHERE id = ${id}
      RETURNING *
    `;
    
    if (result.length === 0) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return Response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return Response.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}